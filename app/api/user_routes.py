from flask import Blueprint, request
from flask_login import login_required, logout_user, current_user
from app.models import User, db
from app.forms import EditAccountForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete a user
    """
    if id > 9:  #Protect seeded data
        requested_user = User.query.get(id)

        if current_user.is_authenticated:
            if requested_user.id == current_user.to_dict()["id"]:
                db.session.delete(requested_user)
                db.session.commit()
                logout_user()
                return {"message":"success"}
    return {'errors': ['Unauthorized']}, 403

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    """
    Edit user info
    """
    form = EditAccountForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if id > 9 and form.validate_on_submit(): #Protect seeded data
        requested_user = User.query.get(id)
        if current_user.is_authenticated:
            if requested_user.id == current_user.to_dict()["id"]:
                requested_user.email = form.data['email']
                requested_user.phone_number = form.data['phone_number']
                requested_user.first_name = form.data['first_name']
                requested_user.last_name = form.data['last_name']
                requested_user.address = form.data['address']
                requested_user.city = form.data['city']
                requested_user.state = form.data['state']
                db.session.commit()
                return requested_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
