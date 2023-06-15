from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class AddImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    preview = BooleanField('preview', validators=[DataRequired(),])
    user_id = IntegerField('user_id', validators=[DataRequired()])
