import unittest
import json
import check_env
from app import app
from utilities import client_methods
from initialize_db import initialize_database
from db import db
import utilities.reminder_methods as reme
from datetime import datetime

class TestReminderMethods(unittest.TestCase):
    def setUp(self):
        self.deltas = [-5, 0, 2, 7]
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)

        self.client_data = {"user_id": "1",
                            "company": "Testiyritys",
                            "email": "testi@gmail.com",
                            "phonenumber": "+358 123456789",
                            "bi_code": "1234567-8",
                            "deadlines": json.dumps([1731196800000, 1594876800000]),
                            "payperiod": "kuukausi"}
        client_methods.add_client(self.client_data)
        db.session.commit()

    def test_days_to_next_run_returns_right_values(self):
        run_days = [0, 2, 5]
        self.assertEqual(reme.days_to_next_run(run_days, 0), 2)
        self.assertEqual(reme.days_to_next_run(run_days, 2), 3)
        self.assertEqual(reme.days_to_next_run(run_days, 3), 2)
        self.assertEqual(reme.days_to_next_run(run_days, 5), 2)

    def test_include_in_run_is_true_when_today_is_in_deltas(self):
        self.assertEqual(reme.include_in_run(2, 1, self.deltas), True)
        self.assertEqual(reme.include_in_run(-5, 7, self.deltas), True)
        self.assertEqual(reme.include_in_run(0, 3, self.deltas), True)

    def test_include_in_run_is_true_when_next_run_is_between_today_and_next_run(self):
        self.assertEqual(reme.include_in_run(9, 3, self.deltas), True)
        self.assertEqual(reme.include_in_run(1, 2, self.deltas), True)
        self.assertEqual(reme.include_in_run(-3, 4, self.deltas), True)

    def test_include_in_run_is_false(self):
        self.assertEqual(reme.include_in_run(10, 3, self.deltas), False)
        self.assertEqual(reme.include_in_run(-6, 1, self.deltas), False)
        self.assertEqual(reme.include_in_run(1, 1, self.deltas), False)

    def test_get_phonenumbers(self):
        with app.app_context():
            client_phone = reme.get_phonenumbers([1])
            self.assertEqual(len(client_phone), 1)
            self.assertEqual(client_phone, ["+358123456789"])

    def test_get_emails(self):
        with app.app_context():
            client_email = reme.get_emails([1])
            self.assertEqual(len(client_email), 1)
            self.assertEqual(client_email, ["testi@gmail.com"])

    def test_get_deadline_data(self):
        with app.app_context():
            dl_data = reme.get_deadline_data(client_service = client_methods)
            self.assertEqual(len(dl_data), 2)

    def test_get_reminder_data(self):
        with app.app_context():
            reminder_data = reme.get_reminder_data()
            self.assertEqual(len(reminder_data), 3)
