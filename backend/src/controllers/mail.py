from flask import jsonify, request
from flask_mail import Message

from app import app
from utilities.client_methods import get_clients_deadlines, get_email
from utilities.require_login import require_login
from utilities.require_admin import require_admin
from mail_scheduler import mail

@app.route('/api/mail', methods = ['GET', 'POST'])
@require_login
@require_admin
def manual_reminders():
    if request.method == 'GET':
        clients = get_clients_deadlines()
        return jsonify(clients), 200

    if request.method == 'POST':
        request_data = request.get_json()
        recipients = request_data.get('recipients', [])
        message = request_data.get('message', '')
        for client_id in recipients:
            receiver = get_email(client_id)
            msg = Message('Muistutus',
                        sender = app.config['MAIL_USERNAME'],
                        recipients = [receiver])
            msg.body = str(message)
            mail.send(msg)
        return 'Reminders sent', 200
    return jsonify({'error': 'Virhe sähköpostiviestin lähetyksessä'}), 500
