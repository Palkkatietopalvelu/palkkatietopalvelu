from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from utilities import client_methods
from flask_mail import Mail, Message
from app import app
from os import getenv

app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

def reminder():
    with app.app_context():
        recipient = "placeholdermaili@gmail.com"
        msg = Message('Muistutus',
                    sender = app.config['MAIL_USERNAME'],
                    recipients = [recipient])
        msg.body = '''Hei! Tämä on automaattinen muistutus
        palkka-ainestojen toimituksen lähestyvästä eräpäivästä.'''
        mail.send(msg)

def start_scheduler():
    sched = BackgroundScheduler(daemon=True)
    trigger = CronTrigger(
        year="2025", month="*", day="*", hour="*", minute="*", second="*",
    )
    sched.add_job(reminder,trigger = trigger)
    sched.start()
