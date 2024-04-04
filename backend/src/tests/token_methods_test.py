import unittest
import os
from app import app
import jwt
from initialize_db import initialize_database
import json
from utilities import client_user
from utilities import token_methods
from datetime import datetime, timedelta, timezone
from daily_scheduler import delete_old_expired_tokens
from db import db
from sqlalchemy.sql import text

class TestUsersController(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.client_data = { "user_id": 1,
                        "company": "Testiyritys",
                        "email": "testi@gmail.com",
                        "phonenumber": "+358 123456789",
                        "bi_code": "1234567-8",
                        "deadlines": json.dumps([1731196800000, 1594876800000]),
                        "payperiod": "kuukausi"}
        self.token = jwt.encode({
            "username": "pekka@mail.com", "id": 1, "role": 1}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {self.token}"}
        app.test_client().post("/api/client", headers=self.headers, json=self.client_data)
        self.setpassword_token = token_methods.generate_setpassword_token(self.client_data["email"])

    def test_verify_setpassword_token_with_deleted_client(self):
        client_user.delete_client_user(self.client_data["email"])
        with self.assertRaises(PermissionError):
           token_methods.verify_setpassword_token(self.setpassword_token)

    def test_verify_setpassword_token_with_expired_token(self):
        expiration_time = datetime.now(timezone.utc) - timedelta(seconds=1)  # set expiration time to the past
        token = jwt.encode({"username": self.client_data["email"], "exp": expiration_time}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        with self.assertRaises(PermissionError):
           token_methods.verify_setpassword_token(token)

    def test_verify_setpassword_token_with_used_token(self):
        sql = text("""INSERT INTO expired_tokens (token, date)
                        VALUES (:token, :date)""")
        db.session.execute(sql, {'token': self.setpassword_token, 'date': datetime.now(timezone.utc).date()})
        db.session.commit()
        with self.assertRaises(PermissionError):
           token_methods.verify_setpassword_token(self.setpassword_token)

    def test_delete_old_expired_tokens(self):
        sql = text("""
            INSERT INTO expired_tokens (token, date)
            VALUES (:token, :date)""")
        data = [
            {'token': 'sfd8f89c8s0c9', 'date': '2022-07-22'},
            {'token': 'sfd8f89c8s0c9', 'date': '2024-01-21'},
            {'token': 'sfd8f89c8s0c9', 'date': datetime.now(timezone.utc).date()-timedelta(days=2)},
            {'token': 'sfd8f89c8s0c9', 'date': datetime.now(timezone.utc).date()-timedelta(days=1)},
            {'token': 'sfd8f89c8s0c9', 'date': datetime.now(timezone.utc).date()},
        ]
        db.session.execute(sql, data)
        db.session.commit()
        delete_old_expired_tokens()
        sql = text("""SELECT id FROM expired_tokens""")
        result = db.session.execute(sql).fetchall()
        self.assertEqual(len(result), 2)