import unittest
from datetime import datetime
import sqlalchemy.exc
from db import db
from app import app
from utilities import client_methods as client
import controllers.users
import utilities.client_methods as client_methods
import utilities.file_methods as file_methods
import controllers.files as files
from initialize_db import initialize_database
import json

class TestUpdateClient(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.client_id = 1
        self.client_data = {
            "user_id": "1",
            "company": "Testiyritys",
            "email": "testi@gmail.com",
            "phonenumber": "+358 123456789",
            "bi_code": "1234567-8",
            "deadlines": json.dumps([1731196800000, 1594876800000]),
            "payperiod": "kuukausi"
        }
        client_methods.add_client(self.client_data)
        db.session.commit()
        self.file = {
            "id": 1,
            "owner": 1,
            "name": "test.pdf",
            "path": "test/path",
            "date": datetime.now()
        }
        self.odt = {
            "id": 1,
            "owner": 1,
            "path": "test/path",
            "date": datetime.now()
        }

    def tearDown(self):
        initialize_database()

    def test_add_file_success(self):
        with app.app_context():
            file_methods.add_file(self.file)
            all_files = file_methods.get_all_files()
            self.assertEqual(len(all_files), 1)

    # testing only file_methods here, validation normally happens in files.py
    def test_add_wrong_filetype(self):
        with app.app_context():
            with self.assertRaises(sqlalchemy.exc.StatementError):
                file_methods.add_file(self.odt)

    def test_get_single_file(self):
        with app.app_context():
            file_methods.add_file(self.file)
            file = file_methods.get_file(1)
            # not checking date because psql handles the timezone specification
            for key in ['id', 'owner', 'name', 'path']:
                self.assertEqual(file[key], self.file[key])

    def test_try_nonexisting_file(self):
        with app.app_context():
            file = file_methods.get_file(1)
            self.assertEqual(file, None)

    def test_delete_file(self):
        with app.app_context():
            file_methods.add_file(self.file)
            all_files = file_methods.get_all_files()
            self.assertEqual(len(all_files), 1)
            file_methods.delete_file(1, remove_file=False)
            all_files = file_methods.get_all_files()
            self.assertEqual(len(all_files), 0)
    
    def test_delete_file_fails_with_invalid_id(self):
        with app.app_context():
            file_methods.add_file(self.file)
            all_files = file_methods.get_all_files()
            self.assertEqual(len(all_files), 1)
            file_methods.delete_file(5, remove_file=False) # wrong id
            all_files = file_methods.get_all_files()
            self.assertEqual(len(all_files), 1)
