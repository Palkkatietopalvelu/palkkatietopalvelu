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
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

if ENV == "development":
    app.config["SQLALCHEMY_DATABASE_URI"] = TEST_DATABASE_URL
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

app.secret_key = getenv("SECRET_KEY")
CORS(app)
#db.init_app(app)
init_db(app)

# pylint: disable=unused-import,wrong-import-position
from controllers import users, clients, login, mail
from mail_scheduler import start_scheduler
# pylint: enable=unused-import,wrong-import-position

start_scheduler('9')

if __name__ == '__main__':
    #db.init_app(app)
    app.run()
