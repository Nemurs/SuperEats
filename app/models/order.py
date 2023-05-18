from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__ = 'order'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'item.id')), nullable=False, unique=False)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'user.id')), nullable=False, unique=False)
    cart_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'cart.id')), nullable=False, unique=False)

    item = db.relationship('Item', back_populates='item_orders')
    user = db.relationship('User', back_populates='user_orders')
    cart = db.relationship('Cart', back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'itemId':self.item_id,
            'userId':self.user_id,
            'item': self.item.to_dict_no_items(),
            'user': self.user.to_dict_no_items()
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'itemId':self.item_id,
            'userId':self.user_id
        }
