from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(10), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False, unique=False)
    last_name = db.Column(db.String(255), nullable=False, unique=False)
    address = db.Column(db.String(100), nullable=False, unique=False)
    city = db.Column(db.String(100), nullable=False, unique=False)
    state = db.Column(db.String(2), nullable=False, unique=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'phoneNumber': self.phone_number,
            'email': self.email
        }
