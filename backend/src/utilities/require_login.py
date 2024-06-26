"""Metodi, joka tarkistaa onko käyttäjä kirjautunut"""
import os
from functools import wraps
from flask import request, jsonify
import jwt

def require_login(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]
        if not token:
            return jsonify({'error' : 'Token puuttuu'}), 401

        try:
            user_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256']) # pylint: disable=unused-variable
        except: # pylint: disable=bare-except
            return jsonify({
                'error' : 'Virheellinen tai vanhentunut token. Kirjaudu sisään uudelleen'
            }), 401
        return  f(*args, **kwargs)

    return decorated
