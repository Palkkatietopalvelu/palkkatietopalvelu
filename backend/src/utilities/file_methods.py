import os
from datetime import datetime, timedelta
from sqlalchemy.sql import text
from db import db
from config import UPLOAD_FOLDER

def get_all_files():
    sql = text("""
        SELECT 
            f.id, 
            f.owner, 
            f.name, 
            f.path, 
            f.date, 
            f.delete_date, 
            f.deleted_by,
            c.company
        FROM 
            files f 
            JOIN clients c ON f.owner = c.id
        ORDER BY f.date DESC
    """)
    result = db.session.execute(sql)
    all_files = [{
        "id": row[0],
        "owner": row[1],
        "name": row[2],
        "path": row[3],
        "date": row[4],
        "delete_date": row[5],
        "deleted_by": row[6], 
        "company": row[7]
    } for row in result.fetchall()]

    # add clients' deadlines to files
    for i, file in enumerate(all_files):
        sql = text("""SELECT deadline FROM deadlines WHERE client_id=:owner ORDER BY deadline""")
        result = db.session.execute(sql, {"owner": file["owner"]})
        all_files[i]["deadlines"] =  [row[0] for row in result.fetchall()]

    return all_files

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

def delete_file(file_id, remove_file=True):
    file = get_file(file_id)
    if file:
        sql = text("DELETE FROM files WHERE id=:id")
        db.session.execute(sql, {"id": file_id})
        db.session.commit()
        if remove_file:
            os.remove(os.path.join(UPLOAD_FOLDER, file['path']))
        return True
    return False
