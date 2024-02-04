from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User, db
from app import app

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user(testing="no", uname="", upass="", urole=""):
    if testing == "no":
        data = request.get_json()
        username = data['username']
        password = data['password']
        role = data['role']
    elif testing == "yes":
        username = uname
        password = upass
        role = urole

    if len(password) < 3 or len(username) < 3:
        return jsonify(
            {"error": "Käyttäjätunnus ja salasana täytyy olla ainakin 3 merkkiä pitkiä"}
        ), 400

    if len(password) > 15 or len(username) > 15:
        return jsonify(
            {"error": "Käyttäjätunnus ja salasana ei saa olla yli 15 merkkiä pitkiä"}
        ), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Käyttäjätunnus on jo olemassa"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201
