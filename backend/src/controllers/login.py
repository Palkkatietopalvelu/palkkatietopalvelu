import os
from flask import request, jsonify
import jwt
from werkzeug.security import check_password_hash
from models.user import User
from app import app
from utilities.client_methods import get_status

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        if user.role == 2 and not get_status(user.username):
            return jsonify({"error": "Tili jäädytetty deaktivoinnin takia."}), 401
        user_info = {"username": user.username, "id": user.id, "role": user.role}
        token = jwt.encode(user_info, os.environ.get('SECRET_KEY'), algorithm='HS256')
        return jsonify({"token": token, "username": user.username,
                        "id": user.id, "role": user.role}), 200
    return jsonify({"error": "Väärä käyttäjätunnus tai salasana"}), 401
