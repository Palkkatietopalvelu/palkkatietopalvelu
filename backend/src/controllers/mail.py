from flask import request, jsonify
from app import app
from os import getenv
from flask_mail import Mail, Message
from utilities.client_methods import get_email, get_clients_deadlines

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route('/api/mail', methods = ['GET', 'POST'])
def mail():
    if request.method == 'GET':
        clients = get_clients_deadlines()
        print(clients[0]['deadline'])
        return jsonify(clients), 200

    if request.method == 'POST':
        data = request.json
        for client_id in data:
            recipient = get_email(client_id)
            print(recipient)
            msg = Message('Muistutus', sender = app.config['MAIL_USERNAME'], recipients = [recipient])
            msg.body = 'Hei! Tämä on automaattinen muistutus palkka-ainestojen toimituksen lähestyvästä eräpäivästä.'
            mail.send(msg)
        return 'Reminders sent', 200
