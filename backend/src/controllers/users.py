from flask import request, jsonify
from models.user import User, db
from app import app
from werkzeug.security import generate_password_hash

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data['username']
    password = data['password']
    role = data['role']

    if len(password) < 3 or len(username) < 3:
        return jsonify({"error": "Username and password must be at least 3 characters long"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201