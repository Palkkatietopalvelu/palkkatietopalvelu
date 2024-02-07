import unittest
from db import db
from app import app
from models.user import User
import controllers.users
from flask import request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User, db
from initialize_db import initialize_database

class TestUsersController(unittest.TestCase):
    def setUp(self):
        initialize_database()

    def test_get_users(self):
        with app.app_context():
            all_users = controllers.users.get_users()
            self.assertEqual(all_users.status, "200 OK")

    def test_create_user_with_valid_credentials(self):
        with app.test_request_context():
            username = "pekka"
            password = "pekkaspass"
            role = 1
            new_user = controllers.users.create_user(testing="yes", username=username, 
                        password=password, role=role)
            self.assertEqual(new_user[0].status, "200 OK")
            self.assertEqual(new_user[1], 201)

    def test_create_user_that_already_exists(self):
        with app.test_request_context():
            username = "maija"
            password = "maijaspass"
            role = 1
            new_user = controllers.users.create_user(testing="yes", username=username, 
                        password=password, role=role)
            self.assertEqual(new_user[0].status, "200 OK")
            self.assertEqual(new_user[1], 201)
            new_user_again = controllers.users.create_user(testing="yes", username=username, 
                        password=password, role=role)
            self.assertEqual(new_user_again[1], 400)

    # to be added:
        # short username and password
        # long username and password

class TestUserModel(unittest.TestCase):
    def setUp(self):
        initialize_database()

    def test_create_user_with_valid_credentials(self):
        with app.app_context():
            username = "masa"
            password = "mypass"
            role = 1
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, password=hashed_password, role=role)
            self.assertEqual(new_user.username, "masa")
            self.assertNotEqual(new_user.password, "mypass")
            self.assertEqual(len(new_user.password), 162)
            self.assertEqual(new_user.role, role)

