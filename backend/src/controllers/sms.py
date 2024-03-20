import urllib.parse
from flask import jsonify, request
import requests

from app import app
from utilities.client_methods import get_phonenumber
from utilities.require_login import require_login
from utilities.require_admin import require_admin

@app.route('/api/sms', methods=['POST'])
@require_login
@require_admin
def send_sms():
    if app.config['SMS_PASSWORD'] is None:
        return jsonify({'error': "API salasanaa ei ole asetettu"}), 400
    request_data = request.get_json()
    recipients = request_data.get('recipients', [])
    if len(recipients) == 0:
        return jsonify({'Valitse vähintään yksi vastaanottaja', 'danger'}), 400
    message = request_data.get('message', '')
    for client_id in recipients:
        sms_dest = get_phonenumber(client_id)
        sms_text = message
        send_sms_message(sms_dest, sms_text)
    return jsonify({'message': 'Tekstiviestimuistutukset lähetetty onnistuneesti'}), 200

def send_sms_message(sms_dest, sms_text, auto=False):
    sms_username = 'reilu'
    sms_password = app.config['SMS_PASSWORD']
    if sms_password is None:
        if auto:
            return False
    params = urllib.parse.urlencode({
        'sms_username': sms_username,
        'sms_password': sms_password,
        'sms_dest': sms_dest,
        'sms_text': sms_text,
        'encoding': 'utf-8'
    })

    url = f'https://tekstari.fi/send?{params}'
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Virhe lähettäessä viestiä osoitteeseen {sms_dest}: {e}")
        if auto:
            return False
        return jsonify({'error': 'Virhe viestin lähetyksessä'}), 500
    if auto:
        return True
    return jsonify({'message': 'Tekstiviestimuistutukset lähetetty onnistuneesti'}), 200
