from flask import jsonify, request
from flask_mail import Message

from app import app
from utilities.client_methods import get_clients_deadlines, get_email
from utilities.require_login import require_login
from mail_scheduler import mail

@app.route('/api/mail', methods = ['GET', 'POST'])
@require_login
def manual_reminders():
    if request.method == 'GET':
        clients = get_clients_deadlines()
        return jsonify(clients), 200

    if request.method == 'POST':
        data = request.json
        for client_id in data:
            recipient = get_email(client_id)
            msg = Message('Muistutus',
                        sender = app.config['MAIL_USERNAME'],
                        recipients = [recipient])
            msg.body = '''Hei! Tämä on automaattinen muistutus
            palkka-ainestojen toimituksen lähestyvästä eräpäivästä.'''
            mail.send(msg)
        return 'Reminders sent', 200
    return 400
