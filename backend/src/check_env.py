from config import ENV

if ENV != "development":
    raise ValueError('ENV != "development" Please add FLASK_ENV="development" to .env')
