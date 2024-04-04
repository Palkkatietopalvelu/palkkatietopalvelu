import unittest
import os
from datetime import datetime, timedelta
from db import db
from app import app
import utilities.client_methods as client_methods
import utilities.file_methods as file_methods
from initialize_db import initialize_database
import json
import jwt
import sqlalchemy.exc
from werkzeug.datastructures import FileStorage
from io import BytesIO

class TestFile(unittest.TestCase):
    def setUp(self):
        initialize_database()
        data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
        app.test_client().post("/api/users", json=data)
        self.user_id = 1
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
        token = jwt.encode({
            "username": "pekka@mail.com", "id": 1, "role": 1}, os.environ.get('SECRET_KEY'), algorithm='HS256')
        self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}
        self.file_headers = {**self.headers, "Content-Type": 'multipart/form-data'}
    
    def tearDown(self):
        initialize_database()

    def test_move_file_to_trash(self):
        with app.app_context():
            file_methods.add_file(self.file)
            response = app.test_client().post("/api/files/1", headers=self.headers)
            self.assertEqual(response.status_code, 200)
            file = file_methods.get_all_files()[0]
            self.assertEqual(file["delete_date"], datetime.now().date()+timedelta(weeks=1))
            self.assertEqual(file["deleted_by"], self.user_id)

    def test_restore_file(self):
        with app.app_context():
            file_methods.add_file(self.file)
            file_methods.move_file_to_trash(1, self.user_id)
            response = app.test_client().post("/api/files/1/restore", headers=self.headers)
            self.assertEqual(response.status_code, 200)
            file = file_methods.get_all_files()[0]
            self.assertEqual(file["delete_date"], None)
            self.assertEqual(file["deleted_by"], None)

    def test_get_all_files_with_valid_token(self):
        with app.app_context():
            file_methods.add_file(self.file)
            response = app.test_client().get("/api/files", headers=self.headers)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.get_json()), 1)

    def test_upload_odt_file(self):
        with app.app_context():
            with self.assertRaises(sqlalchemy.exc.StatementError):
                file_methods.add_file(self.odt)
            response = app.test_client().post("/api/files", headers=self.headers)
            self.assertEqual(response.status_code, 400)

    def test_upload_pdf_file(self):
        with app.app_context():
            file_methods.add_file(self.file)
            response = app.test_client().post("/api/files/1", headers=self.headers)
            self.assertEqual(response.status_code, 200)

    def test_upload_file_succeeds(self):
        with open("src/tests/test.pdf", "rb") as f:
            file_contents = f.read()
            file_storage = FileStorage(stream=BytesIO(file_contents), filename="test.pdf", content_type="application/pdf")
        files = {'file': file_storage}
        with app.test_request_context():
            response = app.test_client().post("/api/files", headers=self.file_headers, data = files)
            self.assertEqual(response.status_code, 200) # document uploaded successfully
    
    def test_upload_file_fails_without_filename(self):
        with open("src/tests/test.pdf", "rb") as f:
            file_contents = f.read()
            file_storage = FileStorage(stream=BytesIO(file_contents), filename="", content_type="application/pdf")
        files = {'file': file_storage}
        with app.test_request_context():
            response = app.test_client().post("/api/files", headers=self.file_headers, data = files)
            self.assertEqual(response.status_code, 400) # no selected file, missing filename
            self.assertIn('No selected file', str(response.data))
    
    def test_upload_file_fails_with_invalid_file_type(self):
        with open("src/tests/not_a_pdf.txt", "rb") as f:
            file_contents = f.read()
            file_storage = FileStorage(stream=BytesIO(file_contents), filename="not_a_pdf.txt", content_type="text/plain")
        files = {'file': file_storage}
        with app.test_request_context():
            response = app.test_client().post("/api/files", headers=self.file_headers, data = files)
            self.assertEqual(response.status_code, 400) # invalid file type
            self.assertIn('Invalid file type', str(response.data))

    def test_download_file_succeeds(self):
        with app.app_context():
            self.test_upload_file_succeeds()
            response = app.test_client().get("/api/files/1/download", headers=self.headers)
            self.assertEqual(response.status_code, 200)
    
    def test_download_file_fails_with_invalid_id(self):
        with app.app_context():
            response = app.test_client().get("/api/files/5/download", headers=self.headers)
            self.assertEqual(response.status_code, 404)  # file not found

    def test_delete_file_succeeds(self):
        with open("src/tests/test.pdf", "rb") as f:
            file_contents = f.read()
            file_storage = FileStorage(stream=BytesIO(file_contents), filename="test.pdf", content_type="application/pdf")
        files = {'file': file_storage}
        with app.test_request_context():
            response = app.test_client().post("/api/files", headers=self.file_headers, data = files)
            response = app.test_client().delete("/api/files/1", headers=self.headers)
            self.assertEqual(response.status_code, 200)

    def test_delete_file_fails_with_invalid_id(self):
        with app.test_request_context():
            response = app.test_client().delete("/api/files/5", headers=self.headers)
            self.assertEqual(response.status_code, 404)
    
    def test_downlad_csv_template_succeeds(self):
        with app.test_request_context():
            response = app.test_client().get("/api/files/template.csv", headers=self.headers)
            self.assertEqual(response.status_code, 200)