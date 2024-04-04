from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.sql import text
from db import db
from utilities.file_methods import delete_file
from app import app

daily_scheduler = BackgroundScheduler(daemon=True)

def daily_tasks():
    delete_old_files_from_trash()
    delete_old_expired_tokens()

def delete_old_files_from_trash():
    with app.app_context():
        date = datetime.now().date()
        sql = text("SELECT id FROM files WHERE delete_date=:date")
        result = db.session.execute(sql, {"date": date})
        file_ids = [row[0] for row in result.fetchall()]
        for file_id in file_ids:
            try:
                delete_file(file_id)
            except: # pylint: disable=bare-except
                print("Error: automatically deleting file from trash failed")

def delete_old_expired_tokens():
    with app.app_context():
        check_date = datetime.now().date() - timedelta(days=1)
        sql = text("DELETE FROM expired_tokens WHERE date<:date")
        db.session.execute(sql, {"date": check_date})
        db.session.commit()

daily_scheduler.add_job(daily_tasks, 'cron', hour=00, minute=1)
daily_scheduler.start()
