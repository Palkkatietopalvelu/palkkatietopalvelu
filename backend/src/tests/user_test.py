import unittest
from werkzeug.security import generate_password_hash
from app import app
from models.user import User
from initialize_db import initialize_database

class TestUsersController(unittest.TestCase):
    def setUp(self):
        initialize_database()

    def test_get_users(self):
        with app.app_context():
            all_users = app.test_client().get("/api/users")
            self.assertEqual(all_users.status_code, 200)

    def test_create_user_with_valid_credentials(self):
        with app.test_request_context():
            data = {"username": "pekka@mail.com", "password": "pekkaspass", "role": 1}
            response = app.test_client().post("/api/users", json=data)
            self.assertEqual(response.status_code, 201)

    def test_create_user_that_already_exists(self):
        with app.test_request_context():
            data = {"username": "maija@mail.com", "password": "maijaspass", "role": 1}
            new_user = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user.status_code, 201)

            new_user_again = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user_again.status_code, 400)

    def test_create_user_with_incorrect_username(self):
        with app.test_request_context():
            data = {"username": "ab", "password": "abc", "role": 1}
            new_user = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user.status_code, 400)

    def test_create_user_with_too_short_password(self):
        with app.test_request_context():
            data = {"username": "abc@mail.com", "password": "ab", "role": 1}
            new_user = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user.status_code, 400)

    def test_create_user_with_too_long_username(self):
        with app.test_request_context():
            data = {"username": "waytoolongusername@mail.commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", "password": "ok123", "role": 1}
            new_user = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user.status_code, 400)

    def test_create_user_with_too_long_password(self):
        with app.test_request_context():
            data = {"username": "pekka@mail.com", "password": "waytoolongusername", "role": 1}
            new_user = app.test_client().post("/api/users", json=data)
            self.assertEqual(new_user.status_code, 400)

class TestUserModel(unittest.TestCase):
    def setUp(self):
        initialize_database()

    def test_create_user_with_valid_credentials(self):
        with app.app_context():
            username = "masa@mail.com"
            password = "mypass"
            role = 1
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, password=hashed_password, role=role)
            self.assertEqual(new_user.username, "masa@mail.com")
            self.assertNotEqual(new_user.password, "mypass")
            self.assertEqual(len(new_user.password), 162)
            self.assertEqual(new_user.role, role)
