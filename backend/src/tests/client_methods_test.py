import unittest
from db import db
from app import app
from datetime import datetime, date
import controllers.users
import utilities.client_methods as client_methods
from initialize_db import initialize_database

class TestAddClient(unittest.TestCase):
    def setUp(self):
        initialize_database()
        controllers.users.create_user(testing="yes", username="pekka", password="pekka123", role=1)
        self.client_data = { "user_id": "1",
                        "company": "Testiyritys",
                        "email": "testi@gmail.com",
                        "phonenumber": "+358 123456789",
                        "bi_code": "1234567-8",
                        "deadline": "2024-10-04",
                        "payperiod": "kuukausi"}
    
    def test_add_client_with_correct_inputs(self):
        with app.app_context():
            client_methods.add_client(self.client_data)
            all_clients = client_methods.get_clients()
            self.assertEqual(len(all_clients), 1)
        
    def test_validate_client_data_correct(self):
        result = client_methods.validate_client_data(self.client_data)
        self.assertTrue(result)

    def test_validate_client_missing_company(self):
        self.client_data["id"] = None
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_missing_company(self):
        self.client_data["company"] = None
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_incorrect_email(self):
        self.client_data["email"] = "testi.com"
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_incorrect_phonenumber(self):
        self.client_data["phonenumber"] = "+358 123456ab"
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_incorrect_bi_code(self):
        self.client_data["bi_code"] = "12-345"
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_incorrect_deadline(self):
        self.client_data["deadline"] = "12.12.2020"
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

    def test_validate_client_missing_payperiod(self):
        self.client_data["payperiod"] = None
        with self.assertRaises(ValueError):
            client_methods.validate_client_data(self.client_data)

 
class TestClientMethods(unittest.TestCase):
    def setUp(self):
        initialize_database()
        controllers.users.create_user(testing="yes", username="pekka", password="pekka123", role=1)
        
        self.client_data = {"user_id": "1",
                            "company": "Testiyritys",
                            "email": "testi@gmail.com",
                            "phonenumber": "+358 123456789",
                            "bi_code": "1234567-8",
                            "deadline": "2024-10-04",
                            "payperiod": "kuukausi"}
        client_methods.add_client(self.client_data)

    def test_get_clients_returns_type_list(self):
        with app.app_context():
            all_clients = client_methods.get_clients()
            self.assertEqual(type(all_clients), type([]))

    def test_get_client_data_with_id_1(self):
        with app.app_context():
            client_one = client_methods.get_client_data(1)
            self.assertNotEqual(len(client_one["company"]), 0)
            self.assertNotEqual(len(client_one["company"]), 1)
            self.assertEqual("@" in client_one["email"], True)

    def test_get_email_returns_valid_email(self):
        with app.app_context():
            client_email = client_methods.get_email(1)
            self.assertNotEqual(client_email, "None")
            self.assertTrue(len(client_email) > 5)
            self.assertTrue("@" in client_email)
            client_email_parts = client_email.split("@")
            self.assertTrue(len(client_email_parts[0]) > 0)
            self.assertTrue(len(client_email_parts[1]) >= 3)

    def test_get_email_returns_none_when_index_invalid(self):
        with app.app_context():
            invalid_index = 234543234  # no client in db with this index
            client_email = client_methods.get_email(invalid_index)
            self.assertEqual(client_email, None)

    def test_get_client_deadlines(self):
        with app.app_context():
            clients = client_methods.get_clients_deadlines()
            self.assertEqual(type(clients[0]["deadline"]), type(date(2024, 1, 1)))
            # to be added: deadline > now
