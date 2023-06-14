from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    logged_in_user = current_user.to_dict()
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and (logged_in_user["id"] != user.id):
        raise ValidationError('Email address is already in use.')


def phone_number_exists(form, field):
    # Checking if phone_number is already in use
    logged_in_user = current_user.to_dict()
    phone_number = field.data
    user = User.query.filter(User.phone_number == phone_number).first()
    if user and (logged_in_user["id"] != user.id):
        raise ValidationError('Phone Number is already in use.')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    user = User.query.get(form.data['id'])
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class EditAccountForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), password_matches])
    phone_number = StringField('phone_number', validators=[DataRequired(), phone_number_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
