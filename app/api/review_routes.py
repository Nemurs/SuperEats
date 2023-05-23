from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Cart, Review, db
from app.forms import ReviewForm, ReviewEditForm

review_routes = Blueprint('review', __name__)

@review_routes.route('', methods=['POST'])
@login_required
def make_review():
    """
    Make a review.
    """
    server_id = current_user.to_dict()['id']
    data = request.get_json()
    # print("THIS IS THE REQUEST ------->", data)
    if (server_id != data["user_id"]):
        return {'errors': "bad user_id"}, 401

    #create review
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rev = Review(
            review_text=form.data['review_text'],
            rating=form.data['rating'],
            business_id=form.data['business_id'],
            user_id=form.data['user_id'],
            cart_id=form.data['cart_id']
        )
        db.session.add(rev)
        db.session.commit()
        return {"message":f"Successfully added review for user {data['user_id']}"}
    return {'errors': "Could not create review"}, 500

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    """
    Edit a review.
    """
    server_id = current_user.to_dict()['id']
    rev = Review.query.get(review_id)
    #Check that user owns the review
    if (server_id != rev.user_id):
        return {'errors': "bad user_id"}, 401

    #Edit review
    form = ReviewEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rev.review_text=form.data['review_text']
        rev.rating=form.data['rating']

        db.session.add(rev)
        db.session.commit()
        return {"message":f"Successfully edited review for user {rev.user_id}"}
    return {'errors': "Could not edit review"}, 500


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Delete a review.
    """
    server_id = current_user.to_dict()['id']
    server_review = Review.query.get(review_id)
    # print("THIS IS THE REQUEST ------->", data)
    if not server_review:
        return {'errors': "review not found"}, 400
    if (server_id != server_review.user_id):
        return {'errors': "can only delete your own review"}, 401

    #delete review
    db.session.delete(server_review)
    db.session.commit()

    return {"message":f"Successfully deleted review {review_id}"}
