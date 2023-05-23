from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Cart, Review, db

review_routes = Blueprint('review', __name__)

# @review_routes.route('', methods=['POST'])
# @login_required
# def make_review():
#     """
#     Make a review.
#     """
#     server_id = current_user.to_dict()['id']
#     data = request.get_json()
#     # print("THIS IS THE REQUEST ------->", data)
#     if (server_id != data["user_id"]):
#         return {'errors': "bad user_id"}, 401

#     #create review


#     return {"message":f"Successfully added review for user {data['user_id']}"}

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
