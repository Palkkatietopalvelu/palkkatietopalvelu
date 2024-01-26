import requests

class AppLibrary:
    def __init__(self):
        self._base_url = "http://localhost:5173"

        self.reset_application()

    def reset_application(self):
        requests.post(f"{self._base_url}/tests/reset")
    
    def create_user(self, username, password):
        data = {
            "username": username,
            "password": password
        }
        requests.post(f"{self._base_url}/register", data=data)
