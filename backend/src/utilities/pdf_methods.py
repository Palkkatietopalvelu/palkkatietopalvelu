import os
from sqlalchemy.sql import text
from db import db
from config import UPLOAD_FOLDER

def get_all_pdfs():
    sql = text("SELECT id, owner, name, path, date FROM pdfs")
    result = db.session.execute(sql)
    return [{"id": row[0], "owner": row[1], "name": row[2], "path": row[3], "date": row[4]} for row in result.fetchall()]

def get_pdf(pdf_id):
    sql = text("SELECT id, owner, name, path, date FROM pdfs WHERE id=:id")
    result = db.session.execute(sql, {"id": pdf_id}).fetchone()
    if result:
        return {"id": result[0], "owner": result[1], "name": result[2], "path": result[3], "date": result[4]}
    return None

def add_pdf(pdf_data):
    sql = text("""INSERT INTO pdfs (owner, name, path, date)
                  VALUES (:owner, :name, :path, :date)""")
    db.session.execute(sql, pdf_data)
    db.session.commit()

def delete_pdf(pdf_id):
    pdf = get_pdf(pdf_id)
    if pdf:
        sql = text("DELETE FROM pdfs WHERE id=:id")
        db.session.execute(sql, {"id": pdf_id})
        db.session.commit()
        print("lol1")
        os.remove(os.path.join(UPLOAD_FOLDER, pdf['path']))
