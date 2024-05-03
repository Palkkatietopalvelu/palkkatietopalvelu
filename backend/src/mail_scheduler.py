"""Automaattisten muistutuksien lähetys"""
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from utilities.reminder_methods import send_email_reminders, send_sms_reminders
from utilities.sched_setting_methods import load_settings, recover_settings

sched = BackgroundScheduler(daemon=True)

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
                run_new_job(trigger, settings)

            return True

        except ValueError:
            settings = recover_settings()

    return False

def run_new_job(trigger, settings):
    existing_jobs = sched.get_jobs()
    for job in existing_jobs:
        if job.id in ['email_reminders', 'sms_reminders']:
            sched.remove_job(job.id)
    if settings['email']:
        sched.add_job(
            send_email_reminders,
            args=[settings['remindertext'], settings['latetext']],
            trigger=trigger,
            id='email_reminders',
            max_instances=1
        )
    if settings['sms']:
        sched.add_job(
            send_sms_reminders,
            args=[settings['remindertext'], settings['latetext']],
            trigger=trigger,
            id='sms_reminders',
            max_instances=1
        )
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

def list_jobs():
    return sched.print_jobs()

sched.add_job(update_scheduler, 'cron', minute=58)
sched.start()
