import re
from datetime import datetime, date
from sqlalchemy.sql import text
from db import db
import json

def get_clients():
    sql = text("""SELECT id, company, email, phonenumber, bi_code, deadline, payperiod, user_id
               FROM clients""")
    result = db.session.execute(sql)
    all_clients = [{"id": row[0],
                    "company": row[1],
                    "email": row[2],
                    "phonenumber": row[3],
                    "bi_code": row[4],
                    "deadline": row[5],
                    "payperiod": row[6],
                    "user_id": row[7]
                    } for row in result.fetchall()]
    return all_clients

def get_client_data(client_id: int):
    sql = text("""SELECT id, company, email, phonenumber, bi_code, deadline, payperiod
               FROM clients WHERE id=:id""")
    result = db.session.execute(sql, {"id": client_id}).fetchone()
    if result:
        columns = ["id", "company", "email", "phonenumber", "bi_code", "deadline", "payperiod"]
        client_data = dict(zip(columns, result))
        return client_data
    return None

def add_client(client_data):
    validate_client_data(client_data)
    sql = text(
        """INSERT INTO clients (user_id, company, email, phonenumber,bi_code, payperiod)
            VALUES (:user_id, :company, :email, :phonenumber, :bi_code, :payperiod) RETURNING id""")

    result = db.session.execute(
        sql, {"user_id": client_data.get("user_id"),
            "company": client_data.get("company"),
            "email": client_data.get("email"),
            "phonenumber": client_data.get("phonenumber"),
            "bi_code": client_data.get("bi_code"),
            "payperiod": client_data.get("payperiod")})
    db.session.commit()
    add_deadlines(client_data.get("deadline"), result.fetchone().id)

def update_client(client_id, client_data):
    validate_client_data(client_data)
    deadline_str = client_data.get("deadline")
    client_data["deadline"] = datetime.strptime(deadline_str, "%Y-%m-%d").date()
    sql = text("""UPDATE clients
                  SET company=:company, email=:email, phonenumber=:phonenumber, bi_code=:bi_code, 
                      deadline=:deadline, payperiod=:payperiod
                  WHERE id=:id""")
    db.session.execute(sql, {**client_data, "id": client_id})
    db.session.commit()
    return get_client_data(client_id)

def delete_client(client_id):
    sql = text("""DELETE FROM clients WHERE id=:id""")
    db.session.execute(sql, {"id": client_id})
    db.session.commit()

def get_email(client_id):
    sql = text("SELECT email FROM clients WHERE id=:id")
    result = db.session.execute(sql, {"id":client_id}).fetchone()
    if result:
        return result.email
    return None

def get_clients_deadlines():
    sql = text("SELECT id, company, deadline FROM clients")
    result = db.session.execute(sql)
    clients = [{"id": row[0], "company": row[1], "deadline": row[2]} for row in result.fetchall()]
    return clients

def validate_client_data(client_data):
    company = client_data.get("company")
    payperiod = client_data.get("payperiod")
    user_id = client_data.get("user_id")
    if not company or not payperiod or not user_id:
        raise ValueError('Tietoja puuttuu')
    if not re.match(r"^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$", client_data.get("email")):
        raise ValueError('Sähköposti ei ole oikeassa muodossa')
    if not re.match(r"^\+\d{1,3}\s\d{8,12}$", client_data.get("phonenumber")):
        raise ValueError(
            'Puhelinnumero ei ole oikeassa muodossa '
            '(plusmerkki suuntakoodi välilyönti puhelinnumero)'
        )
    if not re.match(r"^\d{7}-\d{1}$", client_data.get("bi_code")):
        raise ValueError('Y-tunnus ei ole oikeassa muodossa (1234567-1)')
    return True

def add_deadlines(deadlines, client_id):
    deadlines = json.loads(deadlines)
    for d in deadlines:
        d = date.fromtimestamp(d/1000)
        sql = text("""INSERT INTO deadlines (deadline, client_id)
                   VALUES (:d, :client_id)""")
        db.session.execute(sql, {"d": d, "client_id": client_id})
    db.session.commit()
