from ..db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    role = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role
        }
