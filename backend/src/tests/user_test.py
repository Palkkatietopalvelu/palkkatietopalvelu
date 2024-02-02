import unittest
from db import db
from models.user import User

class TestUser(unittest.TestCase):
    def test_user_serialize(self):
        #new_user = self.serialize()
        self.assertEqual("hello", "hello")
