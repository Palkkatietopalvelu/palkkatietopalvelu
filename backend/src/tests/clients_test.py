import unittest
import os
import jwt
from app import app
from utilities import client_methods
from initialize_db import initialize_database

class TestClient(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.client_data = { "user_id": "1",
                        "company": "Testiyritys",
                        "email": "testi@gmail.com",
                        "phonenumber": "+358 123456789",
                        "bi_code": "1234567-8",
                        "deadline": "2024-10-04",
                        "payperiod": "kuukausi"}
        token = jwt.encode({
            "username": "pekka", "id": "1"}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}

    def test_get_clients_with_valid_token(self):
        with app.test_request_context():
            client_methods.add_client(self.client_data)
            response = app.test_client().get("/api/clients", headers=self.headers)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.get_json()), 1)

    def test_get_client_with_valid_id(self):
        with app.test_request_context():
            client_methods.add_client(self.client_data)
            response = app.test_client().get("/api/client/1", headers=self.headers)
            self.assertEqual(response.status_code, 200)
            self.assertIn("Testiyritys", str(response.get_json()))

    def test_get_client_with_invalid_id(self):
        with app.test_request_context():
            response = app.test_client().get("/api/client/5", headers=self.headers)
            self.assertEqual(response.status_code, 404)

    def test_add_client_without_login(self):
        with app.test_request_context():
            headers = {"Content-Type": "application/json"}
            response = app.test_client().post("/api/client", headers=headers, json=self.client_data)
            self.assertEqual(response.status_code, 401)

    def test_add_client_with_valid_token(self):
        with app.test_request_context():
            response = app.test_client().post(
                "/api/client", headers=self.headers, json=self.client_data)
            self.assertEqual(response.status_code, 201)
