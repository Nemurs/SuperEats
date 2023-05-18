from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    orders = db.relationship('Order', back_populates='cart', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,

            'orders': [order.to_dict_no_items() for order in self.orders]
        }

    def to_dict_no_items(self):
        return {
            'id': self.id
        }
