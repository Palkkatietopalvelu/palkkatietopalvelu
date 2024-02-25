from datetime import date, timedelta

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from flask_mail import Mail, Message
from utilities import client_methods as clients
from utilities.sched_setting_methods import load_settings
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
            msg.body = '''Eräpäiväsi lähestyy'''
            print(deadline)
            mail.send(msg)

def update_scheduler():
    settings = load_settings()

    if len(sched.get_jobs()) != 0:
        sched.remove_job('reminders')

    if settings['enabled']:
        trigger = create_trigger(
            hour = settings['hour'],
            days = settings['days']
        )
        sched.add_job(send_reminders, trigger = trigger, id = 'reminders', max_instances = 1)
    return True

def create_trigger(
    hour,
    days: list = 'mon-fri',
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

def get_deadline_data():
    deadlines_with_ids = clients.get_next_deadlines()
    deadlines = []
    client_ids = []
    for deadline in deadlines_with_ids:
        if deadline.next_deadline - date.today() <= timedelta(days=3):
            deadlines.append(deadline.next_deadline)
            client_ids.append(deadline.client_id)
    return deadlines, client_ids

def get_emails(client_ids):
    emails = []
    for c_id in client_ids:
        emails.append(clients.get_email(c_id))
    return emails

def list_jobs():
    return sched.print_jobs()
