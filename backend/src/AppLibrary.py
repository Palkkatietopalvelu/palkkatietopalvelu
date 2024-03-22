import requests
from initialize_db import initialize_database
from utilities.token_methods import generate_setpassword_token

class AppLibrary:
    def __init__(self):
        self._base_url = "http://localhost:5173"
        self._timeout = 5

        self.reset_application()

    def reset_application(self):
        requests.post(f"{self._base_url}/tests/reset", timeout=self._timeout)

    def initialize_db(self):
        initialize_database()

    def create_user(self, username, password):
        data = {
            "username": username,
            "password": password,
            "role": 1
        }
        requests.post(f"{self._base_url}/register", data=data, timeout=self._timeout)

    def set_password_link(self, email):
        robot_token = generate_setpassword_token(email)
        return self._base_url + '/setpassword/' + robot_token