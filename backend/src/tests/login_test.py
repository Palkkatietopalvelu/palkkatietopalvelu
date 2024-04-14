import unittest
from app import app
from initialize_db import initialize_database
import check_env

class TestLoginController(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "masa@mail.com", "password": "masa123", "role": 1}
        app.test_client().post("/api/users", json=data)

    def test_login_with_correct_credentials(self):
        with app.test_request_context():
            data = {"username": "masa@mail.com", "password": "masa123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 200)

    def test_login_with_incorrect_username_and_right_password(self):
        with app.test_request_context():
            data = {"username": "bertta@mail.com", "password": "masa123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 401)

    def test_login_with_incorrect_password_and_right_username(self):
        with app.test_request_context():
            data = {"username": "masa@mail.com", "password": "wrong"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 401)

    def test_login_with_incorrect_credentials(self):
        with app.test_request_context():
            data = {"username": "hacker", "password": "password123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 401)

    def test_login_with_no_username(self):
        with app.test_request_context():
            data = {"username": "", "password": "password123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 401)

    def test_login_with_no_password(self):
        with app.test_request_context():
            data = {"username": "hacker", "password": ""}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 401)
