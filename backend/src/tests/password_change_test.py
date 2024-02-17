import unittest
import os
import jwt
from app import app
from initialize_db import initialize_database

class TestPasswordChange(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        token = jwt.encode(
            {"username": "pekka", "id": "1"}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}

    def test_login_works_with_initial_password(self):
        with app.test_request_context():
            data = {"username": "pekka", "password": "pekka123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 200)

    def test_change_password_with_valid_data(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "okPwd",
                    "confirmPassword": "okPwd"}
            response = app.test_client().post("/api/users/1", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 200)

    def test_login_after_password_change(self):
        with app.test_request_context():
            self.test_change_password_with_valid_data()
            data = {"username": "pekka", "password": "okPwd"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 200)

    def test_change_password_with_unequal_passwords(self):
        with app.test_request_context():
            data = {
                "oldPassword": "pekka123",
                "newPassword": "okPwd",
                "confirmPassword": "wrongPwd"}
            response = app.test_client().post("/api/users/1", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_wrong_initial_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "notMyPwd",
                    "newPassword": "okPwd",
                    "confirmPassword": "okPwd"}
            response = app.test_client().post("/api/users/1", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_too_short_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "aa",
                    "confirmPassword": "aa"}
            response = app.test_client().post("/api/users/1", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_too_long_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "waytoolongpassword",
                    "confirmPassword": "waytoolongpassword"}
            response = app.test_client().post("/api/users/1", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)
