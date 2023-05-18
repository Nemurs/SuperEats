from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Business(db.Model):
    __tablename__ = 'business'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(10), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False, unique=False)
    address = db.Column(db.String(100), nullable=False, unique=False)
    city = db.Column(db.String(100), nullable=False, unique=False)
    state = db.Column(db.String(2), nullable=False, unique=False)

    images = relationship('BusinessImage', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'images': [image.to_dict_no_items() for image in self.images]
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
        }
