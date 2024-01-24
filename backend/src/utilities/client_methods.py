from datetime import datetime
from sqlalchemy.sql import text
from db import db

def get_all_clients_from_db():
    sql = text("SELECT company FROM customers")
    result = db.session.execute(sql)
    all_companies = [row[0] for row in result.fetchall()]
    return all_companies

def add_new_client(client_data):
    deadline_str = client_data.get("deadline")
    deadline = datetime.strptime(deadline_str, "%Y-%m-%d").date()
    sql = text("""INSERT INTO customers (company, email, phonenumber, bi_code, deadline, payperiod)
               VALUES (:company, :email, :phonenumber, :bi_code, :deadline, :payperiod)""")

    db.session.execute(sql, {   "company": client_data.get("company"),
                                "email": client_data.get("email"),
                                "phonenumber": client_data.get("phonenumber"),
                                "bi_code": client_data.get("bi_code"),
                                "deadline": deadline,
                                "payperiod": client_data.get("payperiod")})
    db.session.commit()
    