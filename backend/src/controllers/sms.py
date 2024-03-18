from flask import jsonify, request
import requests
import urllib.parse

from app import app
from utilities.client_methods import get_phonenumber
from utilities.require_login import require_login
from utilities.require_admin import require_admin

@app.route('/api/sms', methods=['POST'])
@require_login
@require_admin
def send_sms():
    sms_username = 'reilu'
    sms_password = app.config['SMS_PASSWORD']
    request_data = request.get_json()
    recipients = request_data.get('recipients', [])
    message = request_data.get('message', '')
    for client_id in recipients:
        sms_dest = get_phonenumber(client_id)
        sms_text = message

        params = urllib.parse.urlencode({
            'sms_username': sms_username,
            'sms_password': sms_password,
            'sms_dest': sms_dest,
            'sms_text': sms_text,
            'encoding': 'utf-8'
        })

        url = f'https://tekstari.fi/send?{params}'
        try:
            response = requests.get(url)
            response.raise_for_status()
            if response.text.startswith('ERROR'):
                print(f"Virhe lähettäessä viestiä osoitteeseen {sms_dest}: {response.text}")
        except requests.RequestException as e:
            print(f"Virhe lähettäessä viestiä osoitteeseen {sms_dest}: {e}")
            return jsonify({'error': 'Virhe viestin lähetyksessä'}), 500

    return jsonify({'message': 'Tekstiviestimuistutukset lähetetty onnistuneesti'}), 200
