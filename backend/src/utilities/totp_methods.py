from sqlalchemy.sql import text
from db import db
import os
from cryptography.fernet import Fernet

def add_totp_secret(secret, user_id):
    if get_totp_secret(user_id):
        remove_two_factor(user_id)
    f = Fernet(os.environ.get('FERNET_KEY').encode('UTF-8'))
    token = f.encrypt(secret.encode('UTF-8'))
    sql = text("""INSERT INTO two_factor_secrets (user_id, totp_secret, active)
               VALUES (:user_id, :secret, false)""")
    db.session.execute(sql, {"user_id": user_id, "secret": token.decode()})
    db.session.commit()

def get_totp_secret(user_id):
    f = Fernet(os.environ.get('FERNET_KEY').encode('UTF-8'))
    sql = text("""SELECT totp_secret FROM two_factor_secrets WHERE user_id=:user_id""")
    result = db.session.execute(sql, {"user_id": user_id}).fetchone()
    if result:
        return f.decrypt(result.totp_secret)
    return None

def set_active(user_id):
    sql = text("""UPDATE two_factor_secrets SET active = true WHERE user_id=:user_id""")
    db.session.execute(sql, {"user_id": user_id})
    db.session.commit()

def remove_two_factor(user_id):
    sql = text("""DELETE FROM two_factor_secrets WHERE user_id=:user_id""")
    db.session.execute(sql, {"user_id": user_id})
    db.session.commit()
