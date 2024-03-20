from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.sql import text
from db import db
from utilities.file_methods import delete_file
from app import app

trash_scheduler = BackgroundScheduler(daemon=True)

def delete_old_files():
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

trash_scheduler.add_job(delete_old_files, 'cron', hour=0, minute=1)
trash_scheduler.start()
