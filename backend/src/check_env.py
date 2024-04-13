from config import ENV

if not ENV:
    raise ValueError('ENV != "development" Please add FLASK_ENV="development" to .env')
