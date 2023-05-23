from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewEditForm(FlaskForm):
    review_text = StringField('review_text', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
