import unittest
from datetime import datetime
import sqlalchemy.exc
from db import db
from app import app
from utilities import client_methods as client
import controllers.users
import utilities.client_methods as client_methods
import utilities.pdf_methods as pdf_methods
import controllers.pdfs as pdfs
from initialize_db import initialize_database

class TestUpdateClient(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.client_id = 1
        self.client_data = {
            "user_id": "1",
            "company": "Testiyritys",
            "email": "testi@gmail.com",
            "phonenumber": "+358 123456789",
            "bi_code": "1234567-8",
            "deadline": "2024-10-04",
            "payperiod": "kuukausi"
        }
        client_methods.add_client(self.client_data)
        self.pdf = {
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

    def test_add_pdf_success(self):
        with app.app_context():
            pdf_methods.add_pdf(self.pdf)
            files = pdf_methods.get_all_pdfs()
            self.assertEqual(len(files), 1)

    # testing only pdf_methods here, validation normally happens in pdfs.py
    def test_add_wrong_filetype(self):
        with app.app_context():
            with self.assertRaises(sqlalchemy.exc.StatementError):
                pdf_methods.add_pdf(self.odt)

    def test_get_single_pdf(self):
        with app.app_context():
            pdf_methods.add_pdf(self.pdf)
            pdf = pdf_methods.get_pdf(1)
            # not checking date because psql handles the timezone specification
            for key in ['id', 'owner', 'name', 'path']:
                self.assertEqual(pdf[key], self.pdf[key])

    def test_delete_pdf(self):
        with app.app_context():
            pdf_methods.add_pdf(self.pdf)
            files = pdf_methods.get_all_pdfs()
            self.assertEqual(len(files), 1)
            pdf_methods.delete_pdf(1, remove_file=False)
            files = pdf_methods.get_all_pdfs()
            self.assertEqual(len(files), 0)
