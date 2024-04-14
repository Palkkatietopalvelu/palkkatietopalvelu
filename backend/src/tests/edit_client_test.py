import unittest
from app import app
from utilities import client_methods as client
import utilities.client_methods as client_methods
from initialize_db import initialize_database
import json
import check_env

class TestUpdateClient(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.client_id = 1
        self.original_client_data = {
            "user_id": "1",
            "company": "Testiyritys",
            "email": "testi@gmail.com",
            "phonenumber": "+358 123456789",
            "bi_code": "1234567-8",
            "deadlines": json.dumps([1731196800000, 1594876800000]),
            "payperiod": "kuukausi"
        }
        self.updated_client_data = {
            "user_id": "1",
            "company": "UpdatedTestiyritys",
            "email": "updatedtesti@gmail.com",
            "phonenumber": "+358 987654321",
            "bi_code": "7654321-8",
            "deadlines": json.dumps([1931326800000, 1894895300000]),
            "payperiod": "vuosi"
        }


    def test_edit_client_with_correct_inputs(self):
        with app.app_context():
            client_methods.add_client(self.original_client_data)
            client_methods.update_client(1, self.updated_client_data)
            client_one = client_methods.get_client_data(1)
            self.assertEqual(client_one["payperiod"], "vuosi")

    def test_delete_client(self):
        with app.app_context():
            client_methods.add_client(self.original_client_data)
            client_methods.delete_client(1)
            all_clients = client_methods.get_clients()
            self.assertEqual(len(all_clients), 0)

    def test_validate_client_missing_company(self):
        invalid_company_data = self.updated_client_data.copy()
        invalid_company_data["company"] = None

        with self.assertRaises(ValueError):
            client.update_client(self.client_id, invalid_company_data)

    def test_email_format_correct(self):
        # Assuming update_client validates email format
        invalid_email_data = self.updated_client_data.copy()
        invalid_email_data['email'] = "invalidemail"  # Invalid email format
        with self.assertRaises(ValueError):
            client.update_client(self.client_id, invalid_email_data)

    def test_phonenumber_format_correct(self):
        # Assuming update_client validates phone number format
        invalid_phone_data = self.updated_client_data.copy()
        invalid_phone_data['phonenumber'] = "123456"  # Invalid phone format

        with self.assertRaises(ValueError):
            client.update_client(self.client_id, invalid_phone_data)

    def test_bi_code_format_correct(self):
        # Assuming update_client validates BI code format
        invalid_bi_code_data = self.updated_client_data.copy()
        invalid_bi_code_data['bi_code'] = "123-4567"  # Invalid BI code format
        with self.assertRaises(ValueError):
            client.update_client(self.client_id, invalid_bi_code_data)
