from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class OrderForm(FlaskForm):
    print("form tbd")
    # phone_number = StringField('phone_number', validators=[DataRequired(), phone_number_exists])
    # email = StringField('email', validators=[DataRequired(), user_exists])
    # first_name = StringField('first_name', validators=[DataRequired()])
    # last_name = StringField('last_name', validators=[DataRequired()])
    # address = StringField('address', validators=[DataRequired()])
    # city = StringField('city', validators=[DataRequired()])
    # state = StringField('state', validators=[DataRequired()])
    # password = StringField('password', validators=[DataRequired()])
