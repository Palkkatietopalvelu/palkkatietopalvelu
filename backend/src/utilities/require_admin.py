import os
from functools import wraps
from flask import request
import jwt

def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]

        user_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256']) # pylint: disable=unused-variable
        if user_data["role"] != 1:
            return ("Sinulla ei ole vaadittuja oikeuksia tähän toimintoon"), 401
        return  f(*args, **kwargs)

    return decorated
