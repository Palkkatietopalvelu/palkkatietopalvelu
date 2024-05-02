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
    
    def test_login_email_not_case_sensitive(self):
        with app.test_request_context():
            create_user_data = {"username": "Pekka@mail.com", "password": "pekka123", "role": 1}
            response = app.test_client().post("/api/users", json=create_user_data)
            self.assertEqual(response.status_code, 201)
            # user created with email Pekka@mail.com
            # lets log in as pekka@mail.com
            login_data = {"username": "pekka@mail.com", "password": "pekka123"}
            response = app.test_client().post("/api/login", json=login_data)
            self.assertEqual(response.status_code, 200) # works
    
    def test_login_email_not_case_sensitive_part2(self):
        with app.test_request_context():
            create_user_data = {"username": "matti@mail.com", "password": "matti123", "role": 1}
            response = app.test_client().post("/api/users", json=create_user_data)
            self.assertEqual(response.status_code, 201)
            # user created with email matti@mail.com
            # lets log in as MATTI@mail.com
            login_data = {"username": "MATTI@mail.com", "password": "matti123"}
            response = app.test_client().post("/api/login", json=login_data)
            self.assertEqual(response.status_code, 200) # works