"""Reititys kirjautumiselle"""
from flask import request, jsonify
from utilities.client_methods import get_status
from utilities.user_methods import generate_user_info, check_credentials
from utilities.totp_methods import check_active_status
from utilities.two_factor_authentication import confirm_two_factor
from app import app

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = check_credentials(data)

    if user:
        if user.role == 2 and not get_status(user.username):
            return jsonify({"error": "Tili on asetettu epäaktiiviseksi."}), 401
        if check_active_status(user.id):
            if not confirm_two_factor(user.id, data['code']):
                return jsonify({"error": "Väärä todennuskoodi"}), 401
        user_data = generate_user_info(user)
        return user_data, 200

    return jsonify({"error": "Väärä käyttäjätunnus tai salasana"}), 401
