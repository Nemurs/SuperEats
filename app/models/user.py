from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'user'

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

    images = db.relationship('UserImage', back_populates='user', cascade="all, delete-orphan")
    user_reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
    user_orders = db.relationship('Order', back_populates='user', cascade="all, delete-orphan")
    user_carts = db.relationship('Cart', back_populates='user', cascade="all, delete-orphan")

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
            'email': self.email,
            'phoneNumber': self.phone_number,
            'firstName':self.first_name,
            'lastName':self.last_name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'images': [image.to_dict_no_items() for image in self.images],
            'userReviews': [user_review.to_dict_no_items() for user_review in self.user_reviews],
            'userOrders': [user_order.to_dict() for user_order in self.user_orders]
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'firstName':self.first_name,
            'lastName':self.last_name,
            'address':self.address,
            'city':self.city,
            'state':self.state
        }
