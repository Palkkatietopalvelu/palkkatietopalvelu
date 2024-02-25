from flask import request
from mail_scheduler import update_scheduler
from utilities.sched_setting_methods import get_readable_settings, save_settings
from utilities.require_login import require_login
from utilities.require_admin import require_admin
from app import app

@app.route('/api/reminders', methods = ['GET', 'POST'])
@require_login
@require_admin
def reminder_settings():
    if request.method == 'GET':
        return get_readable_settings()

    if request.method == 'POST':
        data = request.json
        save_settings(data)
        update_scheduler()
        return get_readable_settings()

    return 400
