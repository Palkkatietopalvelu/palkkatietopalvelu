from flask import jsonify
from models.user import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Message
from utilities.require_login import require_login
from mail_scheduler import mail
from app import app
from config import ENV

@require_login
def create_client_user(email):
    try:
        username = email
        password = "asiakas"
        role = 2
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
    except:
        raise ValueError('Virhe asiakkaan tunnusten luomisessa')
    if ENV != "development":
        send_login_email(email, password)
    return jsonify(new_user.serialize()), 201

def send_login_email(email, password):
    try:
        recipient = email
        msg = Message('Tunnukset',
                    sender = app.config['MAIL_USERNAME'],
                    recipients = [recipient])
        msg.body = f'''Hei! Tässä tunnuksesi palkka-aineistojen toimituspalveluun:
        käyttäjänimi: {email}
        salasana: {password} '''
        mail.send(msg)
        return 'Asiakkaan tunnukset lähetetty', 200
    except:
        raise ValueError('Virhe tunnusten lähetyksessä asiakkaan sähköpostiin')
