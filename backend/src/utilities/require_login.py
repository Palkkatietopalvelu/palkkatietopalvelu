import os
from flask import request, jsonify
from functools import wraps
import jwt

def require_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]
        if not token:
            return jsonify({'message' : 'Token puuttuu'}), 401
        
        try:
            user_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        except:
            return jsonify({
                'message' : 'Virheellinen token'
            }), 401
        return  f(*args, **kwargs)
  
    return decorated