"""Reititys kirjautumiselle"""
import os
import time
from datetime import datetime, timedelta, timezone
from flask import request, jsonify
import jwt
from werkzeug.security import check_password_hash
from sqlalchemy import func
from models.user import User
from utilities.client_methods import get_status
from app import app

@app.route('/api/login', methods=['POST'])
def login():
    now_ms = int( time.time_ns() / 10**6)
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter(func.lower(User.username) == func.lower(username)).first()

    if user and check_password_hash(user.password, password):
        if user.role == 2 and not get_status(user.username):
            return jsonify({"error": "Tili on asetettu epäaktiiviseksi."}), 401
        valid_for = timedelta(hours=10)
        expiration_time = datetime.now(timezone.utc) + valid_for
        user_info = {"username": user.username,
                     "id": user.id,
                     "role": user.role,
                     "exp": expiration_time}
        token = jwt.encode(user_info, os.environ.get('SECRET_KEY'), algorithm='HS256')
        return jsonify({"token": token, "username": user.username,
                        "id": user.id, "role": user.role, "two_fa": True,
                        "exp": (now_ms + (valid_for/timedelta(milliseconds=1)))}), 200
    return jsonify({"error": "Väärä käyttäjätunnus tai salasana"}), 401
