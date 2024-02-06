import os
from flask import request, jsonify
import jwt
from werkzeug.security import check_password_hash
from models.user import User
from app import app

@app.route('/api/login', methods=['POST'])
def login(testing="no", username="", password=""):
    if testing == "no":
        data = request.get_json()
        username = data['username']
        password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        user_info = {"username": user.username, "id": user.id}
        token = jwt.encode(user_info, os.environ.get('SECRET_KEY'), algorithm='HS256')
        return jsonify({"token": token, "username": user.username, "id": user.id}), 200
    return jsonify({"error": "väärä käyttäjätunnus tai salasana"}), 401
