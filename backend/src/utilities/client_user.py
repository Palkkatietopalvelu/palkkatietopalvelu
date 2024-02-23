import os
import secrets
import jwt
from flask import jsonify, request
from flask_mail import Message
from werkzeug.security import generate_password_hash
from mail_scheduler import mail
from app import app
from config import ENV
from models.user import User, db

def create_client_user(email):
    try:
        username = email
        password = secrets.token_hex(16)
        role = 2
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, role=role)
        db.session.add(new_user)
    except Exception as e:
        raise ValueError('Virhe asiakkaan tunnusten luomisessa') from e
    if ENV != "development":
        send_login_email(email)
    return jsonify(new_user.serialize()), 201

def send_login_email(email):
    try:
        token = get_setpassword_token(email)
        link = request.headers['FrontUrl'] + '/setpassword/' + token
        recipient = email
        msg = Message('Tunnukset',
                    sender = app.config['MAIL_USERNAME'],
                    recipients = [recipient])
        msg.body = f'''Hei! Tässä linkki, josta pääset asettamaan salasanan palkkatietopalveluun.
        Sähköpostisi toimii käyttäjänimenä. 
        {link}'''
        mail.send(msg)
        return 'Asiakkaan tunnukset lähetetty', 200
    except Exception as e:
        raise ValueError('Virhe tunnusten lähetyksessä asiakkaan sähköpostiin') from e

def get_setpassword_token(email):
    user_info = {"username": email}
    token = jwt.encode(user_info, os.environ.get('SECRET_KEY'), algorithm='HS256')
    return token

def verify_setpassword_token(token):
    try:
        user_info = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        return user_info
    except jwt.ExpiredSignatureError as e:
        raise PermissionError('Vanhentunut token') from e
    except jwt.InvalidTokenError as e:
        raise PermissionError('Väärä token') from e
    except Exception as e:
        raise PermissionError(str(e)) from e
