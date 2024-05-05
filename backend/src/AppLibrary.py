"""metodeja testeille"""
import requests
from initialize_db import initialize_database
from utilities.token_methods import generate_setpassword_token
from utilities.user_methods import create_user

class AppLibrary:
    def __init__(self):
        self._base_url = "http://localhost:5173"
        self._timeout = 5

        self.reset_application()

    def reset_application(self):
        requests.post(f"{self._base_url}/tests/reset", timeout=self._timeout)

    def initialize_db(self):
        initialize_database()

    def create_new_user(self, username, password, role):
        create_user(username, password, role)

    def set_password_link(self, email):
        robot_token = generate_setpassword_token(email)
        return self._base_url + '/setpassword/' + robot_token