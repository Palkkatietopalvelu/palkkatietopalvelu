import os
from datetime import datetime, timedelta
from sqlalchemy.sql import text
from db import db
from config import UPLOAD_FOLDER

def get_all_files():
    sql = text("SELECT id, owner, name, path, date, delete_date, deleted_by FROM files")
    result = db.session.execute(sql)
    return [{
        "id": row[0],
        "owner": row[1],
        "name": row[2],
        "path": row[3],
        "date": row[4],
        "delete_date": row[5],
        "deleted_by": row[6]
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

def move_file_to_trash(file_id, user_id):
    delete_date = datetime.now().date() + timedelta(weeks=1)
    sql = text("UPDATE files SET delete_date=:delete_date, deleted_by=:user_id WHERE id=:file_id")
    db.session.execute(sql, {"delete_date": delete_date,"user_id": user_id, "file_id": file_id})
    db.session.commit()

def restore_file(file_id):
    sql = text("UPDATE files SET delete_date=NULL, deleted_by=NULL WHERE id=:id")
    db.session.execute(sql, {"id": file_id})
    db.session.commit()

def delete_file(file_id, remove_file=True):
    file = get_file(file_id)
    if file:
        sql = text("DELETE FROM files WHERE id=:id")
        db.session.execute(sql, {"id": file_id})
        db.session.commit()
        if remove_file:
            os.remove(os.path.join(UPLOAD_FOLDER, file['path']))
