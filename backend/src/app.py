""" backend/app.py """

from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
#from mail_service import sendmail

app = Flask(__name__)
mail = Mail(app)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = getenv("SECRET_KEY")
app.config['MAIL_SERVER']='smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)
CORS(app)


import controllers.clients

@app.route('/api/data')
def get_data():
    """ Main data page """
    data = [{'id': 1, 'name': 'Example 1'}, {'id': 2, 'name': 'Example 2'}]
    return jsonify(data)

@app.route('/mail')
def send_mail():
    """ mailpga """
    msg = Message('Hello', sender = app.config['MAIL_USERNAME'], recipients = [app.config['MAIL_USERNAME']])
    msg.body = 'Hello, this is flaskmailtest'
    mail.send(msg)
    return "Sent"

if __name__ == '__main__':
    app.run()
