import unittest
from utilities import client_methods as client

class TestUpdateClient(unittest.TestCase):
    def setUp(self):
        self.client_id = 1
        self.original_client_data = {
            "company": "Testiyritys",
            "email": "testi@gmail.com",
            "phonenumber": "+358 123456789",
            "bi_code": "1234567-8",
            "deadline": "2024-10-04",
            "payperiod": "kuukausi"
        }
        self.updated_client_data = {
            "company": "UpdatedTestiyritys",
            "email": "updatedtesti@gmail.com",
            "phonenumber": "+358 987654321",
            "bi_code": "7654321-8",
            "deadline": "2025-10-04",
            "payperiod": "vuosi"
        }


    # Tänne testit jossa validoidaan onnistunut tietojen päivitys


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

    def test_deadline_format_correct(self):
        # Assuming update_client validates deadline format
        invalid_deadline_data = self.updated_client_data.copy()
        invalid_deadline_data['deadline'] = "10/04/2025"  # Invalid deadline format

        with self.assertRaises(ValueError):
            client.update_client(self.client_id, invalid_deadline_data)
