import os
import re
from datetime import datetime, timedelta
import jwt
from werkzeug.security import check_password_hash
from flask_mail import Message
from app import app, mail
from models.user import User
from utilities import client_user

def validate_credentials(username, password):
    if existing_user(username):
        raise ValueError ("Tällä sähköpostilla on jo luotu tunnus")

    validate_email(username)

    if len(username) > 50:
        raise ValueError ("Sähköposti ei saa olla yli 50 merkkiä pitkä")

    if len(password) < 3:
        raise ValueError ("Salasana täytyy olla ainakin 3 merkkiä pitkä")

    if len(password) > 15:
        raise ValueError ("Salasana ei saa olla yli 15 merkkiä pitkä")

    return True

def existing_user(username):
    if User.query.filter_by(username=username).first():
        return True
    return False

def validate_email(email):
    if not re.match(r"^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$", email):
        raise ValueError("Sähköposti ei ole oikeassa muodossa")

def validate_password(old_password, password, confirm_password, user):
    if not check_password_hash(user.password, old_password):
        raise ValueError ("Väärä nykyinen salasana")
    check_new_passwords(password, confirm_password)
    return True

def check_new_passwords(password, confirm_password):
    if len(password) < 3:
        raise ValueError ("Salasanan täytyy olla ainakin 3 merkkiä pitkä")

    if len(password) > 15:
        raise ValueError ("Salasana ei saa olla yli 15 merkkiä pitkä")

    if password != confirm_password:
        raise ValueError ("Salasanat eivät täsmää")

def send_password_reset_email(email):
    try:
        token = get_resetpassword_token(email)
        link = client_user.setpassword_link(token)
        recipient = email
        msg = Message('Unohtunut salasana',
                    sender = app.config['MAIL_USERNAME'],
                    recipients = [recipient])
        msg.body = f'''Hei! Tässä linkki, josta pääset vaihtamaan salasanasi palkkatietopalveluun.
{link}
Linkki on voimassa 30 minuuttia.'''
        mail.send(msg)
        return 'Asiakkaan tunnukset lähetetty', 200
    except Exception as e: # pylint: disable=broad-except
        raise ValueError('Virhe tunnusten lähetyksessä asiakkaan sähköpostiin', e) from e

def get_resetpassword_token(email):
    expiration_time = datetime.utcnow() + timedelta(minutes=30)
    data = {"username": email, "exp": expiration_time}
    token = jwt.encode(data, os.environ.get('SECRET_KEY'), algorithm='HS256')
    return token
