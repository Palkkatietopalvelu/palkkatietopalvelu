import unittest
import os
import jwt
from app import app
from initialize_db import initialize_database
import check_env

class TestPasswordChange(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        token = jwt.encode(
            {"username": "pekka", "id": "1"}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}

    def test_login_works_with_initial_password(self):
        with app.test_request_context():
            data = {"username": "pekka@mail.com", "password": "pekka123"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 200)

    def test_change_password_with_valid_data(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "okPwd",
                    "confirmPassword": "okPwd"}
            response = app.test_client().post("/api/users/2", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 200)

    def test_login_after_password_change(self):
        with app.test_request_context():
            self.test_change_password_with_valid_data()
            data = {"username": "pekka@mail.com", "password": "okPwd"}
            response = app.test_client().post("/api/login", json=data)
            self.assertEqual(response.status_code, 200)

    def test_change_password_with_unequal_passwords(self):
        with app.test_request_context():
            data = {
                "oldPassword": "pekka123",
                "newPassword": "okPwd",
                "confirmPassword": "wrongPwd"}
            response = app.test_client().post("/api/users/2", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_wrong_initial_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "notMyPwd",
                    "newPassword": "okPwd",
                    "confirmPassword": "okPwd"}
            response = app.test_client().post("/api/users/2", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_too_short_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "aa",
                    "confirmPassword": "aa"}
            response = app.test_client().post("/api/users/2", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_change_password_with_too_long_pwd(self):
        with app.test_request_context():
            data = {"oldPassword": "pekka123",
                    "newPassword": "waytoolongpassword",
                    "confirmPassword": "waytoolongpassword"}
            response = app.test_client().post("/api/users/2", json=data, headers=self.headers)
            self.assertEqual(response.status_code, 400)

class TestResetPassword(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.headers = {"Content-Type": "application/json"}

    def test_reset_password_with_not_existing_user(self):
        with app.test_request_context():
            data = {"email": "maija@mail.com"}
            response = app.test_client().post("/api/resetpassword", json=data)
            self.assertEqual(response.status_code, 400)

    def test_reset_password_with_invalid_username_form(self):
        with app.test_request_context():
            data = {"email": "maija"}
            response = app.test_client().post("/api/resetpassword", json=data)
            self.assertEqual(response.status_code, 400)