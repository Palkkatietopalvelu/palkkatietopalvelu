import os
from datetime import datetime, timedelta, timezone
from sqlalchemy.sql import text
import jwt
from db import db

def generate_setpassword_token(email):
    expiration_time = datetime.now(timezone.utc) + timedelta(days=1)
    data = {"username": email, "exp": expiration_time}
    token = jwt.encode(data, os.environ.get('SECRET_KEY'), algorithm='HS256')
    return token

def verify_setpassword_token(token):
    try:
        sql = text("""SELECT id FROM expired_tokens WHERE token=:token""")
        token_result = db.session.execute(sql, {"token": token}).fetchone()
        if token_result:
            raise PermissionError('Vanhentunut token')

        user_info = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        sql = text("""SELECT username FROM users WHERE username=:username""")
        result = db.session.execute(sql, {"username": user_info["username"]}).fetchone()
        if not result:
            raise PermissionError('Tällä sähköpostilla ei ole enää käyttäjää')
        return user_info

    except jwt.ExpiredSignatureError as e:
        raise PermissionError('Vanhentunut token') from e
    except jwt.InvalidTokenError as e:
        raise PermissionError('Väärä token') from e
    except Exception as e: # pylint: disable=broad-except
        raise PermissionError(str(e)) from e

def expire_token(token):
    date = datetime.now(timezone.utc).date()
    sql = text("""INSERT INTO expired_tokens (token, date)
            VALUES (:token, :date)""")
    db.session.execute(sql, {"token": token, "date": date})
    db.session.commit()
