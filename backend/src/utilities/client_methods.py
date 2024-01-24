from datetime import datetime
from sqlalchemy.sql import text
from db import db

def get_all_clients_from_db():
    sql = text("SELECT id, company FROM customers")
    result = db.session.execute(sql)
    all_clients = [{"id": row[0], "company": row[1]} for row in result.fetchall()]
    return all_clients

def get_client_data(client_id: int):
    sql = text("""SELECT company, email, phonenumber, bi_code, deadline, payperiod
               FROM customers WHERE id=:id""")
    result = db.session.execute(sql, {"id": client_id}).fetchone()
    if result:
        columns = ["company", "email", "phonenumber", "bi_code", "deadline", "payperiod"]
        client_data = dict(zip(columns, result))
        return client_data
    return None

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
