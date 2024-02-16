import re
from datetime import date
import json
from sqlalchemy.sql import text
from db import db

def get_clients():
    sql = text("""SELECT id, company, email, phonenumber,
               bi_code, payperiod, user_id FROM clients""")
    result = db.session.execute(sql)
    all_clients = [{"id": row[0],
                    "company": row[1],
                    "email": row[2],
                    "phonenumber": row[3],
                    "bi_code": row[4],
                    "payperiod": row[5],
                    "user_id": row[6]
                    } for row in result.fetchall()]

    for i, client in enumerate(all_clients):
        sql = text("""SELECT deadline FROM deadlines WHERE client_id=:id ORDER BY deadline""")
        result = db.session.execute(sql, {"id": client["id"]})
        all_clients[i]["deadlines"] =  [row[0] for row in result.fetchall()]
    return all_clients


def get_client_data(client_id: int):
    sql = text("""SELECT id, company, email, phonenumber, bi_code,
               payperiod, user_id FROM clients WHERE id=:id""")
    result = db.session.execute(sql, {"id": client_id}).fetchone()
    if result:
        client_data = {"id": result[0],
                        "company": result[1],
                        "email": result[2],
                        "phonenumber": result[3],
                        "bi_code": result[4],
                        "payperiod": result[5],
                        "user_id": result[6]
                        }
        dl_sql = text("""SELECT deadline FROM deadlines WHERE client_id=:id ORDER BY deadline""")
        dl_result = db.session.execute(dl_sql, {"id": client_id})
        client_data["deadlines"] =  [row[0] for row in dl_result.fetchall()]
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
    add_deadlines(client_data.get("deadlines"), result.fetchone().id)

def update_client(client_id, client_data):
    validate_client_data(client_data)
    sql = text("""UPDATE clients
                  SET company=:company, email=:email, phonenumber=:phonenumber, bi_code=:bi_code, 
                    payperiod=:payperiod WHERE id=:id""")
    db.session.execute(sql, {**client_data, "id": client_id})
    db.session.commit()
    delete_deadlines(client_id)
    add_deadlines(client_data.get("deadlines"), client_id)

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
    sql = text("""SELECT c.id, c.company, d.deadline FROM clients c
               JOIN deadlines d ON c.id = d.client_id ORDER BY d.deadline""")
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
        sql = text("""INSERT INTO deadlines (deadline, client_id, delivered)
                   VALUES (:d, :client_id, :delivered)""")
        db.session.execute(sql, {"d": d, "client_id": client_id, "delivered": False})
    db.session.commit()

def delete_deadlines(client_id):
    sql = text("""DELETE FROM deadlines WHERE client_id=:client_id""")
    db.session.execute(sql, {"client_id": client_id})
    db.session.commit()


def get_next_deadlines():
    sql = text("""SELECT MIN(deadline) AS next_deadline,
               client_id FROM deadlines
               GROUP BY client_id ORDER BY next_deadline""")
    result = db.session.execute(sql)
    return result.fetchall()
