from app import app
from os import getenv
from flask_mail import Mail, Message

mail = Mail(app)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAIL_SERVER']='smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/mail')
def send_mail():
    """ mailpga """
    msg = Message('Hello', sender = app.config['MAIL_USERNAME'], recipients = [app.config['MAIL_USERNAME']])
    msg.body = 'Hello, this is flaskmailtest'
    mail.send(msg)
    return "Sent"