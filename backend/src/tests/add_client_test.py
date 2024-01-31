import unittest
from unittest.mock import Mock
from app import app

class TestAddClient(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_add_client(self):
        response = self.app.get('/api/data')
        assert response.status_code == 200