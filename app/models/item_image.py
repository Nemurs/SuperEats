from .db import db, environment, SCHEMA, add_prefix_for_prod

class ItemImage(db.Model):
    __tablename__ = 'item_image'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1000), nullable=False, unique=False)
    preview = db.Column(db.Boolean, nullable=False, unique=False)
    item_id = db.Column(db.ForeignKey(add_prefix_for_prod(
        'item.id')), nullable=False, unique=False)

    item = db.relationship('Item', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'preview': self.preview,
            'itemId':self.item_id,
            'item': self.item.to_dict_no_items()
        }

    def to_dict_no_items(self):
        return {
            'id': self.id,
            'url': self.url,
            'preview': self.preview,
            'itemId':self.item_id,
        }
