import os
from sqlalchemy.sql import text
from db import db
from config import UPLOAD_FOLDER

def get_all_files():
    sql = text("SELECT id, owner, name, path, date FROM files")
    result = db.session.execute(sql)
    return [{
        "id": row[0], "owner": row[1], "name": row[2], "path": row[3], "date": row[4]
    } for row in result.fetchall()]

def get_file(file_id):
    sql = text("SELECT id, owner, name, path, date FROM files WHERE id=:id")
    result = db.session.execute(sql, {"id": file_id}).fetchone()
    if result:
        return {
            "id": result[0],
            "owner": result[1],
            "name": result[2],
            "path": result[3],
            "date": result[4]
        }
    return None

def add_file(file_data):
    sql = text("""INSERT INTO files (owner, name, path, date)
                  VALUES (:owner, :name, :path, :date)""")
    db.session.execute(sql, file_data)
    db.session.commit()

def delete_file(file_id, remove_file=True):
    file = get_file(file_id)
    if file:
        sql = text("DELETE FROM files WHERE id=:id")
        db.session.execute(sql, {"id": file_id})
        db.session.commit()
        if remove_file:
            os.remove(os.path.join(UPLOAD_FOLDER, file['path']))
