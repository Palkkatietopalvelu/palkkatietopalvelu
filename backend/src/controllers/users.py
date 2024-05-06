"""Reititykset käyttäjään liittyen (tilitoimisto ja asiakas)"""
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User, db
from app import app
from utilities.require_login import require_login
from utilities import user_methods
from utilities import token_methods
import utilities.two_factor_authentication as tfa
from utilities.user_methods import generate_user_info
from utilities.totp_methods import set_active, remove_two_factor, check_active_status
from sqlalchemy import func

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        role = data['role']
        new_user = user_methods.create_user(username, password, role)
        return new_user, 201
    except ValueError as error:
        return str(error), 400

@app.route('/api/users/<int:user_id>', methods=['POST'])
@require_login
def change_password(user_id):
    try:
        data = request.get_json()
        user = User.query.filter_by(id=user_id).first()
        old_password = data["oldPassword"]
        new_password = data["newPassword"]
        confirm_password = data["confirmPassword"]
        user_methods.validate_password(old_password, new_password, confirm_password, user)
        user.password = generate_password_hash(new_password)
        db.session.add(user)
        db.session.commit()
        return "Salasana vaihdettu", 200
    except ValueError as error:
        return str(error), 400

@app.route('/api/setpassword/<token>', methods = ['GET', 'POST'])
def setpassword(token):
    if request.method == 'GET':
        try:
            user_info = token_methods.verify_setpassword_token(token)
            return "Token on oikea", 200
        except PermissionError as error:
            return str(error), 401
    if request.method == 'POST':
        try:
            data = request.get_json()
            user_info = token_methods.verify_setpassword_token(token)
            user = User.query.filter_by(username=user_info['username']).first()
            new_password = data["password"]
            confirm_password = data["confirmPassword"]
            user_methods.check_new_passwords(new_password, confirm_password)
            user.password = generate_password_hash(new_password)
            db.session.add(user)
            db.session.commit()
            token_methods.expire_token(token)
            return "Salasana vaihdettu", 200
        except PermissionError as error:
            return str(error), 401
        except ValueError as error:
            return str(error), 400
    return 400

@app.route('/api/resetpassword', methods = ['POST'])
def resetpassword():
    try:
        data = request.get_json()
        email = data["email"]
        if not user_methods.existing_user(email):
            raise ValueError ("Sähköpostilla ei löytynyt käyttäjää")
        user_methods.send_password_reset_email(email)
        return "Salasanan vaihtolinkki lähetetty sähköpostiin", 200
    except ValueError as error:
        return str(error), 400

@app.route('/api/twofactor/enable/<int:user_id>', methods=['POST'])
def enabletwofactor(user_id):
    data = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    if not user_methods.confirm_password(data['password'], user):
        return "Virheellinen salasana", 401
    return tfa.enable_two_factor(user), 200

@app.route('/api/twofactor/confirm/<int:user_id>', methods=['POST'])
def confirmtwofactor(user_id):
    data = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    if not tfa.confirm_two_factor(user.id, data['code']):
        return "Virheellinen koodi", 401
    set_active(user_id)
    return generate_user_info(user), 200

@app.route('/api/twofactor/disable/<int:user_id>', methods=['POST'])
def disabletwofactor(user_id):
    data = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    if not user_methods.confirm_password(data['password'], user):
        return "Virheellinen salasana", 401
    if not tfa.confirm_two_factor(user.id, data['code']):
        return "Virheellinen koodi", 401
    remove_two_factor(user_id)
    return generate_user_info(user), 200

@app.route('/api/twofactor/check', methods=['POST'])
def checktwofactor():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter(func.lower(User.username) == func.lower(username)).first()

    if user and check_password_hash(user.password, password):
        return jsonify({"two_factor": check_active_status(user.id)}), 200

    return jsonify({"error": "Väärä käyttäjätunnus tai salasana"}), 401
