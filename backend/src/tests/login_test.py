import unittest
from db import db
from app import app
from models.user import User
import controllers.users
import controllers.login
from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User, db

class TestLoginController(unittest.TestCase):
    def setUp(self):
        with app.test_request_context():
            username = "masa"
            password = "masa123"
            role = 1
            new_user = controllers.users.create_user(testing="yes", username=username, 
                        password=password, role=role)

    def test_login_with_correct_credentials(self):
        with app.test_request_context():
            username = "masa"
            password = "masa123"
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 200)

    def test_login_with_incorrect_username_and_right_password(self):
        with app.test_request_context():
            username = "bertta"
            password = "masa123"
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 401)

    def test_login_with_incorrect_password_and_right_username(self):
        with app.test_request_context():
            username = "masa"
            password = "wrong"
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 401)

    def test_login_with_incorrect_credentials(self):
        with app.test_request_context():
            username = "hacker"
            password = "password123"
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 401)

    def test_login_with_no_username(self):
        with app.test_request_context():
            username = ""
            password = "password123"
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 401)

    def test_login_with_no_password(self):
        with app.test_request_context():
            username = "hacker"
            password = ""
            login_attempt = controllers.login.login(testing="yes", username=username, password=password)
            self.assertEqual(login_attempt[0].status, "200 OK")
            self.assertEqual(login_attempt[1], 401)
