from sqlalchemy.sql import text
from db import db

def get_all_clients_from_db():
    sql = text("SELECT company FROM customers")
    result = db.session.execute(sql)
    all_companies = [row[0] for row in result.fetchall()]
    return all_companies

def add_new_client(company: str, email: str, phonenumber: str, bi_code: str, deadline, payperiod: str, material_id: int):
    sql = text("INSERT INTO customers (company, email, phonenumber, bi_code, deadline, payperiod, material_id) VALUES (:company, :email, :phonenumber, :bi_code, :deadline, :payperiod, :material_id)")
    db.session.execute(sql, {"company": company, "email": email, "phonenumber": phonenumber, "bi_code": bi_code, "deadline": deadline, "payperiod": payperiod, "material_id": material_id })
    db.session.commit()
    