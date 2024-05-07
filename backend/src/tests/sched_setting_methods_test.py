import unittest
import json
import os
import jwt
import check_env
from app import app
from utilities import client_methods
from initialize_db import initialize_database
from db import db
import utilities.sched_setting_methods as sched
from datetime import datetime

class TestSchedSettingMethods(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        token = jwt.encode(
            {"username": "pekka", "id": "1", "role": 1}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}

        self.client_data = {"user_id": "1",
                            "company": "Testiyritys",
                            "email": "testi@gmail.com",
                            "phonenumber": "+358 123456789",
                            "bi_code": "1234567-8",
                            "deadlines": json.dumps([1731196800000, 1594876800000]),
                            "payperiod": "kuukausi"}
        client_methods.add_client(self.client_data)
        db.session.commit()
        self.enabled_data = {"days": "0,4",
                        "hour": "10",
                        "enabled": True,
                        "deltas": [0],
                        "email": True,
                        "sms": False,
                        "remindertext": "Hei! T\u00e4m\u00e4 on automaattinen muistutus palkka-ainestojen toimituksen l\u00e4hestyv\u00e4st\u00e4 er\u00e4p\u00e4iv\u00e4st\u00e4. T. Reilu Hallinto",
                        "latetext": "Hei! Palkka-aineistosi ovat my\u00f6h\u00e4ss\u00e4. Toimitathan ne mahdollisimman pian. T. Reilu Hallinto",
                        "remindermail": "Hei! T\u00e4m\u00e4 on automaattinen muistutus palkka-ainestojen toimituksen l\u00e4hestyv\u00e4st\u00e4 er\u00e4p\u00e4iv\u00e4st\u00e4. T. Reilu Hallinto",
                        "latemail": "Hei! Palkka-aineistosi ovat my\u00f6h\u00e4ss\u00e4. Toimitathan ne mahdollisimman pian. T. Reilu Hallinto"}
        self.default_data = {"days": "0,2,4",
                        "hour": "10",
                        "enabled": False,
                        "deltas": [0],
                        "email": False,
                        "sms": False,
                        "remindertext": "Hei! Tämä on automaattinen muistutus palkka-ainestojen toimituksen lähestyvästä eräpäivästä. T. Reilu Hallinto",
                        "latetext": "Hei! Palkka-aineistosi ovat my\u00f6h\u00e4ss\u00e4. Toimitathan ne mahdollisimman pian. T. Reilu Hallinto",
                        "remindermail": "Hei! T\u00e4m\u00e4 on automaattinen muistutus palkka-ainestojen toimituksen l\u00e4hestyv\u00e4st\u00e4 er\u00e4p\u00e4iv\u00e4st\u00e4. T. Reilu Hallinto",
                        "latemail": "Hei! Palkka-aineistosi ovat my\u00f6h\u00e4ss\u00e4. Toimitathan ne mahdollisimman pian. T. Reilu Hallinto"}

    def test_load_settings_with_invalid_filename(self):
        settings = sched.load_settings(filename= 'wrong')
        self.assertEqual(settings, self.default_data)

    def test_save_settings_when_enabled(self):
        settings = sched.save_settings(self.enabled_data, filename = 'test_custom.json')
        self.assertEqual(settings, True)

    def test_save_settings_when_not_enabled(self):
        settings = sched.save_settings(self.default_data, filename = 'test_custom.json')
        self.assertEqual(settings, True)

    def test_save_settings_with_no_days_fails(self):
        self.enabled_data["days"] = ""
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename = 'test_custom.json')
        self.assertEqual(str(context.exception), 'Valitse ainakin yksi lähetyspäivä')
    
    def test_save_settings_with_invalid_hour(self):
        self.enabled_data["hour"] = "24"
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Virheellinen arvo')
    
    def test_save_settings_with_invalid_days(self):
        self.enabled_data["days"] = "99"
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Virheellinen arvo')
    
    def test_save_settings_with_invalid_deltas(self):
        self.enabled_data["deltas"] = ["notdelta"]
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Virheellisiä delta-arvoja')
    
    def test_save_settings_with_no_send_method(self):
        self.enabled_data["email"] = False
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Valitse ainakin yksi lähetystapa')
    
    def test_save_settings_with_short_reminder_text(self):
        self.enabled_data["remindertext"] = "!"
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Muistutusviesti puuttuu')

    def test_save_settings_with_short_late_text(self):
        self.enabled_data["latetext"] = "!"
        with self.assertRaises(ValueError) as context:
            sched.save_settings(self.enabled_data, filename= 'test_custom.json')
        self.assertEqual(str(context.exception), 'Myöhästymisviesti puuttuu')   
    
    def test_recover_settings(self):
        settings = sched.recover_settings(filename= 'test_custom.json')
        self.assertEqual(settings, self.default_data)
    
    def test_get_readable_settings(self):
        settings = sched.get_readable_settings()
        with app.test_request_context():
            res = app.test_client().get("/api/reminders", headers=self.headers)
            res_data = json.loads(res.data.decode('utf-8'))
            self.assertDictEqual(settings, res_data)

    def test_update_settings(self):
        # this test changes directly the custom.json but will also restore the file back to its original format
        og_settings = sched.get_readable_settings()
        with app.test_request_context():
            res = app.test_client().post("/api/reminders", headers=self.headers, json=self.default_data)
            res_data = json.loads(res.data.decode('utf-8'))
            self.assertDictEqual(self.default_data, res_data)
        sched.save_settings(og_settings)  # restores the file back to the original format

    def test_update_settings_fails_with_valueerror(self):
        self.enabled_data["latetext"] = "!"
        with app.test_request_context():
            res = app.test_client().post("/api/reminders", headers=self.headers, json=self.enabled_data)
            self.assertEqual(res.status_code, 400)