from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User, db
from app import app
from utilities.require_login import require_login
from utilities import user_methods
from utilities import token_methods

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
        user_methods.validate_credentials(username, password)
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
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
