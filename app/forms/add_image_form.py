from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.util import ALLOWED_EXTENSIONS

class AddImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    preview = BooleanField('preview', validators=[DataRequired(),])
    user_id = IntegerField('user_id', validators=[DataRequired()])
