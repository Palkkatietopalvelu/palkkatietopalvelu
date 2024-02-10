import unittest
from unittest.mock import Mock
from utilities import client_methods as client

class TestAddClient(unittest.TestCase):
    def setUp(self):
        self.client_data = {"company": "Testiyritys",
                            "email": "testi@gmail.com",
                            "phonenumber": "+358 123456789",
                            "bi_code": "1234567-8",
                            "deadline": "2024-10-04",
                            "payperiod": "kuukausi"}

    def test_validate_client_data_correct(self):
        result = client.validate_client_data(self.client_data)
        self.assertTrue(result)

    def test_validate_client_missing_company(self):
        self.client_data["company"] = None
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

    def test_validate_client_incorrect_email(self):
        self.client_data["email"] = "testi.com"
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

    def test_validate_client_incorrect_phonenumber(self):
        self.client_data["phonenumber"] = "+358 123456ab"
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

    def test_validate_client_incorrect_bi_code(self):
        self.client_data["bi_code"] = "12-345"
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

    def test_validate_client_incorrect_deadline(self):
        self.client_data["deadline"] = "12.12.2020"
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

    def test_validate_client_missing_payperiod(self):
        self.client_data["payperiod"] = None
        with self.assertRaises(ValueError):
            client.validate_client_data(self.client_data)

   #self.app = app.test_client()
         #def test_add_client(self):
    #    response = self.app.get('/api/')
    #    assert response.status_code == 200
