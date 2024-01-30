import unittest
from app import app
from unittest.mock import Mock

class TestAddClient(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_add_client(self):
        response = self.app.get('/api/data')
        assert response.status_code == 200