from flask import Blueprint, jsonify
from flask_login import login_required, logout_user, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


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

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
