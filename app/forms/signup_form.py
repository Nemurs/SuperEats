from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def phone_number_exists(form, field):
    # Checking if phone_number is already in use
    phone_number = field.data
    user = User.query.filter(User.phone_number == phone_number).first()
    if user:
        raise ValidationError('Phone Number is already in use.')


class SignUpForm(FlaskForm):
    phone_number = StringField('phone_number', validators=[DataRequired(), phone_number_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
