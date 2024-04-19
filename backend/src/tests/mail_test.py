# manual reminders page, ./reminders
import unittest
import os
import jwt
from app import app, mail
from utilities import client_methods
from initialize_db import initialize_database
import json
from db import db
import check_env

class TestMailController(unittest.TestCase):
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
        client_methods.add_client(self.client_data)
        db.session.commit()
        token = jwt.encode({
            "username": "pekka@mail.com", "id": 1, "role": 1}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}

    def test_get_deadlines(self):
        with app.test_request_context():
            response = app.test_client().get("/api/mail", headers=self.headers)
            self.assertEqual(response.status_code, 200)
    
    def test_send_manual_reminder(self):
        data = {'recipients': [1]}
        with app.test_request_context():
            response = app.test_client().post("/api/mail", headers=self.headers, json=data)
            self.assertEqual(response.status_code, 200)
  
    def test_send_manual_reminder_invalid_id(self):
        data = {'recipients': [5]}
        with app.test_request_context():
            response = app.test_client().post("/api/mail", headers=self.headers, json=data)
            self.assertEqual(response.status_code, 404)
    
    def test_invalid_request_method(self):
        with app.test_request_context():
            response = app.test_client().put("/api/mail", headers=self.headers)
            self.assertEqual(response.status_code, 405)
