from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from utilities import client_methods as clients
from flask_mail import Mail, Message
from app import app
from os import getenv
from datetime import timedelta, date

mail = Mail(app)

def send_reminders():
    with app.app_context():
        deadlines, emails = get_reminder_data()
        for deadline, email in zip(deadlines, emails):
            print(deadline)
        print(email)
    """
        recipient = "placeholdermaili@gmail.com"
        msg = Message('Muistutus',
                    sender = app.config['MAIL_USERNAME'],
                    recipients = [recipient])
        msg.body = '''Hei! Tämä on automaattinen muistutus
        palkka-ainestojen toimituksen lähestyvästä eräpäivästä.'''
        #mail.send(msg)
        print(msg)
    """
def start_scheduler(
    hour,
    days: list = 'mon-fri',
    minute = '0',
    second = '0'):
    '''
    Args:
        hour: hour for sending e-mails
        days (list): Abbrevations of weekdays
        minute: minute for sending e-mails
        second: second for senging e-mails
    '''
    sched = BackgroundScheduler(daemon=True)
    trigger = CronTrigger(
        day_of_week = str(days),
        hour = str(hour),
        minute = str(minute),
        second = str(second)
    )
    sched.add_job(send_reminders,trigger = trigger)
    sched.start()
    return True

def get_reminder_data():
    deadlines, client_ids = get_deadline_data()
    emails = get_emails(client_ids)
    return deadlines, emails

def get_deadline_data():
    deadlines_with_ids = clients.get_next_deadlines()
    deadlines = []
    client_ids = []
    for deadline in deadlines_with_ids:
        if deadline.next_deadline - date.today() <= timedelta(days=100):
            deadlines.append(deadline.next_deadline)
            client_ids.append(deadline.client_id)
    return deadlines, client_ids

def get_emails(client_ids):
    emails = []
    for c_id in client_ids:
        emails.append(clients.get_email(c_id))
    return emails