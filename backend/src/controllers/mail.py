from flask import request, jsonify
from app import app
from os import getenv
from flask_mail import Mail, Message

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAIL_SERVER']='smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/api/mail', methods = ['GET', 'POST'])
def send_mail():
    """ mailpga """
    mail_object = request.json
    msg = Message('Hello', sender = app.config['MAIL_USERNAME'], recipients = [mail_object['recipient']])
    msg.body = mail_object['recipient']
    mail.send(msg)
    return "Sent"