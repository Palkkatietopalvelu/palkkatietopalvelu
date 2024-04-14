from datetime import date, datetime, timedelta
from flask_mail import Message
from app import app, mail
from controllers.sms import send_sms_message
from utilities import client_methods as clients
from utilities.sched_setting_methods import get_readable_settings


def send_email_reminders(remindertext, latetext):
    with app.app_context():
        deadlines, emails = get_reminder_data()[:2]
        for deadline, email in zip(deadlines, emails): # pylint: disable=unused-variable
            recipient = email
            msg = Message('Eräpäivämuistutus',
                        sender = app.config['MAIL_USERNAME'],
                        recipients = [recipient])
            if is_late(deadline):
                msg.body = f'{latetext}\neräpäivä oli {deadline.strftime("%d.%m.%y")}'
            else:
                msg.body = f'{remindertext}\neräpäivä on {deadline.strftime("%d.%m.%y")}'
            mail.send(msg)

def is_late(deadline):
    return deadline < date.today()

def send_sms_reminders(remindertext, latetext):
    with app.app_context():
        deadlines, _, phonenumbers = get_reminder_data()
        for deadline, phonenumber in zip(deadlines, phonenumber):
            if is_late(deadline):
                success = send_sms_message(phonenumber,
                                           f'{latetext}\n eräpäivä oli {deadline.strftime("%d.%m.%y")}',
                                           auto=True)
            else:
                success = send_sms_message(phonenumber,
                                           f'{remindertext}\neräpäivä on {deadline.strftime("%d.%m.%y")}',
                                           auto=True)
            if not success:
                print(f"Failed to send SMS to {phonenumber}")

def get_reminder_data():
    deadlines, client_ids = get_deadline_data()
    emails = get_emails(client_ids)
    phonenumbers = get_phonenumbers(client_ids)
    return deadlines, emails, phonenumbers

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

def get_phonenumbers(client_ids):
    numbers = []
    for c_id in client_ids:
        numbers.append(clients.get_phonenumber(c_id))
    return numbers

def days_to_next_run(run_days, from_day):
    for day in run_days:
        if not isinstance(day, int) and not day.isnumeric():
            continue
        if int(day) > int(from_day):
            return int(day) - int(from_day)

    return int(run_days[0]) + 7 - int(from_day)

def include_in_run(time_left, to_next_run, deltas):
    for delta in deltas:
        if time_left - to_next_run < delta <= time_left:
            return True
    return False
