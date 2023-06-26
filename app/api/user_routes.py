from flask import Blueprint, request
from flask_login import login_required, logout_user, current_user
from sqlalchemy import func, desc
from app.models import User, UserImage, Cart, Business, BusinessImage, Order, Item, ItemImage, db
from app.forms import AddImageForm, EditAccountForm
from app.util import upload_file_to_s3, get_unique_filename

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


@user_routes.route('/current/favorite_business')
@login_required
def get_fav_business():
    """
    Get the current user's favorite business
    """
    if current_user.is_authenticated:
        id = current_user.to_dict()["id"]
        carts = db.session.query(func.count(Cart.business_id).label('count'), Cart.business_id).filter(
            Cart.user_id == id).group_by(Cart.business_id).order_by(desc('count')).all()

        fav_business = Business.query.get(carts[0][1])
        fav_business_img = BusinessImage.query.filter(
            BusinessImage.business_id == fav_business.id).first()

        out = fav_business.to_dict_no_items()
        out["imgUrl"] = fav_business_img.to_dict_no_items()["url"]
        return {"favoriteBusiness": out}
    return {'errors': ['Unauthorized']}, 403


@user_routes.route('/current/favorite_item')
@login_required
def get_fav_item():
    """
    Get the current user's favorite item
    """
    if current_user.is_authenticated:
        id = current_user.to_dict()["id"]
        orders = db.session.query(func.count(Order.item_id).label('count'), Order.item_id).filter(
            Order.user_id == id).group_by(Order.item_id).order_by(desc('count')).all()
        fav_item = Item.query.get(orders[0][1])
        fav_item_img = ItemImage.query.filter(
            ItemImage.item_id == fav_item.id).first()
        print(orders)

        out = fav_item.to_dict_no_items()
        out["imgUrl"] = fav_item_img.to_dict_no_items()["url"]
        return {"favoriteItem": out}
    return {'errors': ['Unauthorized']}, 403


@user_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_user_pic(id):
    """
    Add a user image
    """
    form = AddImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if id > 9 and form.validate_on_submit():  # Protect seeded data
        requested_user = User.query.get(id)
        if current_user.is_authenticated:
            if requested_user.id == current_user.to_dict()["id"]:
                image = form.data["image"]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)
                if "url" in upload:
                    pfp = UserImage(
                        url=upload["url"],
                        preview=form.data["preview"],
                        user_id=form.data["user_id"],
                    )
                    pfp.user = requested_user
                    db.session.commit()
                    return pfp.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>/images/<int:picId>', methods=['DELETE'])
@login_required
def delete_user_pic(id, picId):
    """
    Delete a user image
    """
    if id > 9:  # Protect seeded data
        requested_user = User.query.get(id)
        if current_user.is_authenticated:
            if requested_user.id == current_user.to_dict()["id"]:
                pic = UserImage.query.get(picId)
                db.session.delete(pic)
                db.session.commit()
                return {'message': 'Successfully deleted picture!'}
    return {'errors': ['Unauthorized']}, 403


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete a user
    """
    if id > 9:  # Protect seeded data
        requested_user = User.query.get(id)

        if current_user.is_authenticated:
            if requested_user.id == current_user.to_dict()["id"]:
                db.session.delete(requested_user)
                db.session.commit()
                logout_user()
                return {"message": "success"}
    return {'errors': ['Unauthorized']}, 403


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    """
    Edit user info
    """
    form = EditAccountForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if id > 9 and form.validate_on_submit():  # Protect seeded data
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
