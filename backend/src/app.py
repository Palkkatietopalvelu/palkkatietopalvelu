""" backend/app.py """

from os import getenv
from flask import Flask
from flask_cors import CORS
from db import init_db
from config import DATABASE_URL, TEST_DATABASE_URL, ENV

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['MAIL_SERVER']='sandbox.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['SMS_PASSWORD'] = getenv('SMS_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# aseta tietokanta
if ENV == "development":
    app.config["SQLALCHEMY_DATABASE_URI"] = TEST_DATABASE_URL
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

init_db(app)

# aseta salainen avain
app.secret_key = getenv("SECRET_KEY")

# aseta CORS
CORS(app)

# pylint: disable=unused-import,wrong-import-position
from controllers import files, users, clients, login, mail, sms, reminders
from mail_scheduler import update_scheduler
import daily_scheduler
# pylint: enable=unused-import,wrong-import-position

update_scheduler()

if __name__ == '__main__':
    #db.init_app(app)
    app.run()
