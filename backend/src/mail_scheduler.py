from datetime import date, timedelta, datetime

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from flask_mail import Mail, Message
from utilities import client_methods as clients
from utilities.sched_setting_methods import load_settings, get_readable_settings, delete_custom
from app import app

mail = Mail(app)
sched = BackgroundScheduler(daemon=True)
sched.start()

def send_reminders():
    with app.app_context():
        deadlines, emails = get_reminder_data()
        for deadline, email in zip(deadlines, emails):
            recipient = email
            msg = Message('Muistutus lähestyvästä eräpäivästä',
                        sender = app.config['MAIL_USERNAME'],
                        recipients = [recipient])
            msg.body = f'Palkka-aineistojen toimituksen eräpäivä on {deadline}'
            mail.send(msg)

def update_scheduler(minute = 0, second = 0):
    settings = load_settings()

    for i in range(1): # pylint: disable=unused-variable
        try:
            if settings['enabled']:
                trigger = create_trigger(
                    hour = settings['hour'],
                    days = settings['days'],
                    minute = minute,
                    second = second
                )
                run_new_job(trigger)

            return True

        except: # pylint: disable=bare-except
            settings = recover_settings()

    return False

def recover_settings(filename = 'custom.json'):
    delete_custom(filename)
    return load_settings('default.json')

def run_new_job(trigger):
    if len(sched.get_jobs()) != 0:
        sched.remove_job('reminders')

    sched.add_job(send_reminders, trigger = trigger, id = 'reminders', max_instances = 1)

    return sched

def create_trigger(
    hour,
    days: list = '*',
    minute = '0',
    second = '0'):
    '''
    Args:
        hour: hour for sending e-mails
        days (list): numbers of weekdays (0-7)
        minute: minute for sending e-mails
        second: second for senging e-mails
    '''
    trigger = CronTrigger(
        day_of_week = str(days),
        hour = str(hour),
        minute = str(minute),
        second = str(second)
    )
    return trigger

def get_reminder_data():
    deadlines, client_ids = get_deadline_data()
    emails = get_emails(client_ids)
    return deadlines, emails

def get_deadline_data(client_service = clients):
    settings = get_readable_settings()
    deltas = [timedelta(days=delta) for delta in settings['deltas']]
    deadlines_with_ids = client_service.get_next_deadlines()
    deadlines = []
    client_ids = []
    today = datetime.today().weekday()
    to_next_run = timedelta(days=days_to_next_run(settings['days'], today))
    for deadline in deadlines_with_ids:
        time_left = deadline.next_deadline - date.today()
        if include_in_run(time_left, to_next_run, deltas):
            deadlines.append(deadline.next_deadline)
            client_ids.append(deadline.client_id)
    return deadlines, client_ids

def get_emails(client_ids):
    emails = []
    for c_id in client_ids:
        emails.append(clients.get_email(c_id))
    return emails

def days_to_next_run(run_days, from_day):
    for day in run_days:
        if day > from_day:
            return day - from_day

    return run_days[0] + 7 - from_day

def include_in_run(time_left, to_next_run, deltas):
    for delta in deltas:
        if time_left - to_next_run < delta <= time_left:
            return True
    return False
