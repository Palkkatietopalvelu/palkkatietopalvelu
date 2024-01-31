from flask import request, jsonify
from app import app
from os import getenv
from flask_mail import Mail, Message
from utilities.client_methods import get_email

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/api/mail', methods = ['GET', 'POST'])
def send():
    data = request.json
    for client_id in data:
        recipient = get_email(client_id)
        print(recipient)
        msg = Message('Muistutus', sender = app.config['MAIL_USERNAME'], recipients = [recipient])
        msg.body = 'Hei! Tämä on automaattinen muistutus palkka-ainestojen toimituksen lähestyvästä eräpäivästä.'
        mail.send(msg)
    return 'Sent'
