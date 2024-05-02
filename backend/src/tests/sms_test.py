import unittest
import os
import jwt
from app import app
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

    def test_send_sms_reminder_succeeds(self):
        data = {'recipients': [1]}
        with app.test_request_context():
            response = app.test_client().post("/api/sms", headers=self.headers, json=data)
            self.assertEqual(response.status_code, 200)
    
    def test_send_sms_reminder_fails_without_recipient(self):
        data = {'recipients': []}
        with app.test_request_context():
            response = app.test_client().post("/api/sms", headers=self.headers, json=data)
            self.assertEqual(response.status_code, 400)
            res_data = json.loads(response.data.decode('utf-8'))
            self.assertIn("Valitse vähintään yksi vastaanottaja", res_data["error"])