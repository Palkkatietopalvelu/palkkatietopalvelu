import unittest
import os
import jwt
from app import app
from initialize_db import initialize_database
import utilities.token_methods as token_methods
import json

class TestPasswordChange(unittest.TestCase):
  def setUp(self):
      initialize_database()
      data = {"username": "pekka@mail.com", "password": "pekka123", "role": 1}
      app.test_client().post("/api/users", json=data)
      self.client_data = {
        "user_id": "1",
        "company": "Testiyritys",
        "email": "testi@gmail.com",
        "phonenumber": "+358 123456789",
        "bi_code": "1234567-8",
        "deadlines": json.dumps([1731196800000, 1594876800000]),
        "payperiod": "kuukausi",
        "active": True
      }
      self.client_id = 1
      token = jwt.encode(
          {"username": "pekka", "id": "1", "role": 1}, os.environ.get('SECRET_KEY'), algorithm='HS256')
      self.headers = {"Content-Type": "application/json", "Authorization": f"Bearer {token}"}
      app.test_client().post("/api/client", headers=self.headers, json=self.client_data)

  def test_login_succeeds_as_client_user(self):
      # set up client user password and login works
      with app.test_request_context():
        self.setpassword_token = token_methods.generate_setpassword_token(self.client_data["email"])
        passwords = { "password": "testi123", "confirmPassword": "testi123"}
        response = app.test_client().post(
          f"/api/setpassword/{self.setpassword_token}",
          headers={"Content-Type": "application/json"}, json=passwords)
        self.assertEqual(response.status_code, 200)
        data = {"username": "testi@gmail.com", "password": "testi123"}
        response = app.test_client().post("/api/login", json=data)
        self.assertEqual(response.status_code, 200)
  
  def test_deactivate_client_succeeds(self):
    # deactivation works
    with app.test_request_context():
        self.client_data["status"] = False
        response = app.test_client().post(f"api/client/{self.client_id}/status", json=self.client_data,
          headers=self.headers)
        self.assertEqual(response.status_code, 200)

  def test_deactivate_client_fails_with_invalid_id(self):
    # non-existing client id
    with app.test_request_context():
        self.client_data["status"] = False
        response = app.test_client().post("api/client/50/status", json=self.client_data,
          headers=self.headers)
        self.assertEqual(response.status_code, 404)
  
  def test_deactivate_client_fails_without_headers(self):
    # without headers/token
    with app.test_request_context():
        self.client_data["status"] = False
        response = app.test_client().post(f"api/client/{self.client_id}/status", json=self.client_data)
        self.assertEqual(response.status_code, 401)
  
  def test_deactivate_client_fails_with_role_2(self):
    # require admin / role 1
    token2 = jwt.encode(
          {"username": "client", "id": "2", "role": 2}, os.environ.get('SECRET_KEY'), algorithm='HS256')
    headers2 = {"Content-Type": "application/json", "Authorization": f"Bearer {token2}"}
    with app.test_request_context():
        self.client_data["status"] = False
        response = app.test_client().post(f"api/client/{self.client_id}/status", json=self.client_data,
          headers=headers2)
        self.assertEqual(response.status_code, 401)
  
  def test_deactivate_client_fails_without_data(self):
    # without client data
    with app.test_request_context():
        response = app.test_client().post(f"api/client/{self.client_id}/status",
          headers=self.headers)
        print(response)
        self.assertEqual(response.status_code, 400)

  def test_login_fails_deactivated_client(self):
      # client user is frozen due to deactivation
      with app.test_request_context():
        data = {"username": "testi@gmail.com", "password": "testi123"}
        response = app.test_client().post("/api/login", json=data)
        self.assertEqual(response.status_code, 401)