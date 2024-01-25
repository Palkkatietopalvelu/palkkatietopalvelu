from flask import Flask, request, jsonify
from models.user import User
from flask_bcrypt import Bcrypt
import jwt
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        user_info = {"username": user.username, "id": user.id}
        token = jwt.encode(user_info, os.environ.get('SECRET_KEY'), algorithm='HS256')
        return jsonify({"token": token, "username": user.username}), 200
    else:
        return jsonify({"error": "invalid username or password"}), 401