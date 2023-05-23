from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'review'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.String(255), nullable=False, unique=False)
    rating = db.Column(db.Integer, nullable=False, unique=False)
    business_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'business.id')), nullable=False, unique=False)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'user.id')), nullable=False, unique=False)
    cart_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'cart.id')), nullable=False, unique=True)

    business = db.relationship('Business', back_populates='business_reviews')
    user = db.relationship('User', back_populates='user_reviews')
    cart_info = db.relationship('Cart', back_populates='cart_review')

    def to_dict(self):
        return {
            'id': self.id,
            'reviewText': self.review_text,
            'rating': self.rating,
            'businessId':self.business_id,
            'userId':self.user_id,
            'cartId':self.cart_id,
            'business': self.business.to_dict_no_items(),
            'user': self.user.to_dict_no_items()
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'reviewText': self.review_text,
            'rating': self.rating,
            'businessId':self.business_id,
            'userId':self.user_id,
            'cartId':self.cart_id,
            'userFirstName':self.user.first_name
        }
