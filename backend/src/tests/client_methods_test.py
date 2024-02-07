import unittest
from db import db
from app import app
from datetime import datetime, date

import utilities.client_methods

# there has to be at least one client in database before test start

class TestClientMethods(unittest.TestCase):
    def test_get_clients_returns_type_list(self):
        with app.app_context():
            all_clients = utilities.client_methods.get_clients()
            self.assertEqual(type(all_clients), type([]))

    def test_get_client_data_with_id_1(self):
        with app.app_context():
            client_one = utilities.client_methods.get_client_data(1)
            self.assertNotEqual(len(client_one["company"]), 0)
            self.assertNotEqual(len(client_one["company"]), 1)
            self.assertEqual("@" in client_one["email"], True)

    def test_get_email_returns_valid_email(self):
        with app.app_context():
            client_email = utilities.client_methods.get_email(1)
            self.assertNotEqual(client_email, "None")
            self.assertTrue(len(client_email) > 5)
            self.assertTrue("@" in client_email)
            client_email_parts = client_email.split("@")
            self.assertTrue(len(client_email_parts[0]) > 0)
            self.assertTrue(len(client_email_parts[1]) >= 3)

    def test_get_email_returns_none_when_index_invalid(self):
        with app.app_context():
            invalid_index = 234543234  # no client in db with this index
            client_email = utilities.client_methods.get_email(invalid_index)
            self.assertEqual(client_email, None)

    def test_get_client_deadlines(self):
        with app.app_context():
            clients = utilities.client_methods.get_clients_deadlines()
            self.assertEqual(type(clients[0]["deadline"]), type(date(2024, 1, 1)))
            # to be added: deadline > now
