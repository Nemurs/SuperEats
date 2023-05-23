from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    review_text = StringField('review_text', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    business_id = IntegerField('business_id', validators=[DataRequired()])
    cart_id = IntegerField('cart_id', validators=[DataRequired()])
