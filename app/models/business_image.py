from .db import db, environment, SCHEMA, add_prefix_for_prod

class BusinessImage(db.Model):
    __tablename__ = 'business_image'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False, unique=False)
    preview = db.Column(db.Boolean, nullable=False, unique=False)
    business_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'business.id')), nullable=False, unique=False)

    business = db.relationship('Business', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'business': self.business.to_dict_no_items()
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state
        }
