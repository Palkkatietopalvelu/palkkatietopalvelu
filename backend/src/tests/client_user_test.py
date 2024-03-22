import unittest
import os
from app import app
import jwt
from initialize_db import initialize_database
import json
from utilities import client_user
from utilities import client_methods
from utilities import token_methods
from db import db
from unittest.mock import patch

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
        self.passwords = { "password": "testi123",
                           "confirmPassword": "testi123"
        }

    def test_setpassword_get_with_valid_token(self):
        with app.test_request_context():
            response = app.test_client().get(f"/api/setpassword/{self.setpassword_token}", headers={"Content-Type": "application/json"})
            self.assertEqual(response.status_code, 200)

    def test_setpassword_get_with_invalid_token(self):
        with app.test_request_context():
            response = app.test_client().get(f"/api/setpassword/sfdjsfj3243kfljew", headers={"Content-Type": "application/json"})
            self.assertEqual(response.status_code, 401)

    def test_setpassword_post_with_valid_token(self):
        with app.test_request_context():
            response = app.test_client().post(f"/api/setpassword/{self.setpassword_token}", headers={"Content-Type": "application/json"}, json=self.passwords)
            self.assertEqual(response.status_code, 200)
        
    def test_setpassword_post_with_invalid_token(self):
        with app.test_request_context():
            response = app.test_client().post(f"/api/setpassword/sfdjsfj3243kfljew", headers={"Content-Type": "application/json"}, json=self.passwords)
            self.assertEqual(response.status_code, 401)

    def test_setpassword_post_with_invalid_password(self):
        passwords = { "password": "testi",
                           "confirmPassword": "testi123"}
        with app.test_request_context():
            response = app.test_client().post(f"/api/setpassword/{self.setpassword_token}", headers={"Content-Type": "application/json"}, json=passwords)
            self.assertEqual(response.status_code, 400)

    def test_handle_email_change_with_valid_email(self):
        client_id = 1
        new_email = "new@email.com"
        client_user.handle_email_change(client_id, new_email)
        db.session.commit()
        response = client_methods.email_is_user(new_email)
        self.assertEqual(response, True)
        oldemail_response = client_methods.email_is_user(self.client_data["email"])
        self.assertEqual(oldemail_response, False)

    def test_handle_email_change_with_same_email(self):
        client_id = 1
        new_email = self.client_data["email"]
        client_user.handle_email_change(client_id, new_email)
        db.session.commit()
        response = client_methods.email_is_user(new_email)
        self.assertEqual(response, True)

    def test_handle_email_change_to_other_clients_email(self):
        client_id = 2
        client_data = { "user_id": 1,
                "company": "Abc Oy",
                "email": "abc@gmail.com",
                "phonenumber": "+358 1230206789",
                "bi_code": "1234427-6",
                "deadlines": json.dumps([1731196800000, 1594876800000]),
                "payperiod": "kuukausi"}
        app.test_client().post("/api/client", headers=self.headers, json=client_data)
        new_email = self.client_data["email"]
        with self.assertRaises(ValueError):
            client_user.handle_email_change(client_id, new_email)

    @patch('utilities.client_user.db.session.execute')
    def test_delete_client_user_with_not_existing_email(self, mock_execute):
        mock_execute.side_effect = Exception("Test Exception")
        with self.assertRaises(ValueError) as context:
            client_user.delete_client_user("notexisting@gmail.com")
        self.assertEqual(str(context.exception), "Virhe vanhan sähköpostin tunnusten poistamisessa")
