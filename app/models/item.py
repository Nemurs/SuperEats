from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Item(db.Model):
    __tablename__ = 'item'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=False)
    price = db.Column(db.Float(10), nullable=False, unique=False)
    category = db.Column(db.String(100), nullable=False, unique=False)
    business_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'business.id')), nullable=False, unique=False)

    business = db.relationship('Business', back_populates='items')
    images = relationship('ItemImage', back_populates='item', cascade="all, delete-orphan")
    item_orders = relationship('Review', back_populates='item', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name':self.name,
            'price':self.price,
            'category':self.category,
            'business_id':self.business_id,
            'business': self.business.to_dict_no_items(),
            'images': [image.to_dict_no_items() for image in self.images],
            'itemOrders': [item_order.to_dict_no_items() for item_order in self.item_orders]
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'name':self.name,
            'price':self.price,
            'category':self.category,
            'business_id':self.business_id
        }
