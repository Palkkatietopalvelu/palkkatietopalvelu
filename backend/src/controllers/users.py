from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User, db
from app import app
from utilities.require_login import require_login

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
        validate_credentials(username, password)
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
        validate_password(old_password, new_password, confirm_password, user)
        user.password = generate_password_hash(new_password)
        db.session.add(user)
        db.session.commit()
        return "Salasana vaihdettu", 200
    except ValueError as error:
        return str(error), 400

def validate_credentials(username, password):
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        raise ValueError ("Käyttäjätunnus on jo olemassa")

    if len(username) < 3 or len(password) < 3:
        raise ValueError ("Käyttäjätunnus ja salasana täytyy olla ainakin 3 merkkiä pitkiä")

    if len(username) > 15 or len(password) > 15:
        raise ValueError ("Käyttäjätunnus ja salasana ei saa olla yli 15 merkkiä pitkiä")

    return True

def validate_password(old_password, password, confirm_password, user):
    if not check_password_hash(user.password, old_password):
        raise ValueError ("Nykyinen salasana on väärin")

    if len(password) < 3:
        raise ValueError ("Salasanan täytyy olla ainakin 3 merkkiä pitkiä")

    if len(password) > 15:
        raise ValueError ("Salasanan ei saa olla yli 15 merkkiä pitkä")

    if password != confirm_password:
        raise ValueError ("Salasanat eivät täsmää")

    return True
