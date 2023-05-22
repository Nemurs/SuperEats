from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Cart(db.Model):
    __tablename__ = 'cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'business.id')), nullable=False, unique=False)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'user.id')), nullable=False, unique=False)

    time_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    time_updated = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    business = db.relationship('Business', back_populates='carts')
    user = db.relationship('User', back_populates='user_carts')
    orders = db.relationship('Order', back_populates='cart_info', cascade="all, delete-orphan")
    cart_review = db.relationship('Review', back_populates='cart_info', cascade="all, delete-orphan", uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'businessId': self.business_id,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
            'business': self.business.to_dict_no_items(),
            'orders': [order.to_dict_no_items() for order in self.orders]
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'businessId': self.business_id,
            'timeCreated': self.time_created,
            'timeUpdated': self.time_updated,
            'businessName': self.business.to_dict_no_items()["name"]
        }
