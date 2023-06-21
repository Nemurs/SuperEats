from .db import db, environment, SCHEMA, add_prefix_for_prod

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
    category = db.Column(db.String(100), nullable=False, unique=False)

    images = db.relationship('BusinessImage', back_populates='business', cascade="all, delete-orphan")
    items = db.relationship('Item', back_populates='business', cascade="all, delete-orphan")
    carts = db.relationship('Cart', back_populates='business', cascade="all, delete-orphan")
    business_reviews = db.relationship('Review', back_populates='business', cascade="all, delete-orphan")

    def to_dict(self):
        avg_business_rating = 0
        business_reviews = [review.to_dict_no_items() for review in self.business_reviews]
        if len(business_reviews) >= 1:
            for review in business_reviews:
                avg_business_rating += review['rating']
            avg_business_rating /= len(business_reviews)

        avg_item_price = 0
        items = [item.to_dict() for item in self.items]
        if len(items) >= 1:
            for item in items:
                avg_item_price += item['price']
            avg_item_price /= len(items)

        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'category':self.category,
            'images': [image.to_dict_no_items() for image in self.images],
            'items': items,
            'avgItemPrice': avg_item_price,
            'carts': [cart.to_dict_no_items() for cart in self.carts],
            'businessReviews': business_reviews,
            'businessRating': avg_business_rating
        }

    def to_dict_no_items(self):
        avg_business_rating = 0
        business_reviews = [review.to_dict_no_items() for review in self.business_reviews]
        if len(business_reviews) >= 1:
            for review in business_reviews:
                avg_business_rating += review['rating']
            avg_business_rating /= len(business_reviews)
        return {
            'id': self.id,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'category':self.category,
            'businessRating': avg_business_rating
        }
