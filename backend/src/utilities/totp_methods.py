from sqlalchemy.sql import text
from db import db
import os
from cryptography.fernet import Fernet

def add_totp_secret(secret, user_id):
	f = Fernet(os.environ.get('SECRET_KEY'))
	token = f.encrypt(secret)
	#encrypted to be saved in database

def get_totp_secret(user_id):
    f = Fernet(os.environ.get('SECRET_KEY'))
    sql = text("""SELECT token FROM WHERE id=:id""")
    result = db.session.execute(sql, {"id": client_id}).fetchone()
    if result:
        return f.decrypt(result.token)
    return None
