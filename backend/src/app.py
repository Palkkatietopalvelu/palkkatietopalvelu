""" backend/app.py """

from os import getenv
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD

import controllers.clients
=======
import controllers.mail
>>>>>>> 61b26f9 (Move mail to own module)

@app.route('/api/data')
def get_data():
    """ Main data page """
    data = [{'id': 1, 'name': 'Example 1'}, {'id': 2, 'name': 'Example 2'}]
    return jsonify(data)

if __name__ == '__main__':
    app.run()
