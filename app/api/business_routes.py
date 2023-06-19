from flask import Blueprint, jsonify, session, request
from app.models import Business, Item, db
from sqlalchemy import or_, and_

business_routes = Blueprint('business', __name__)

@business_routes.route('')
def get_all_businesses():
    """
    Return all businesses info
    """
    businesses = Business.query.all()
    return {'Businesses': [bus.to_dict() for bus in businesses]}

@business_routes.route('/search')
def get_some_businesses():
    """
    Return businesses that match search
    """

    search = list(request.args.keys())[0]
    search = search.split(" ")
    print("search----->", search)

    businesses = Business.query.join(Item).filter(and_((Business.name.like(f"%{term}%"))  | (Business.category.like(f"%{term}%")) | (Item.name.like(f"%{term}%")) | (Item.category.like(f"%{term}%")) for term in search)).all()
    return {'Businesses': [bus.to_dict() for bus in businesses]}

@business_routes.route('/<int:id>')
def get_one_business(id):
    """
    Return 1 business info by id
    """
    business = Business.query.get(id)
    return {'Business': business.to_dict()}
