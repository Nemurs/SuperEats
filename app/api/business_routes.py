from flask import Blueprint, jsonify, session, request
from app.models import Business, Item, db

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
    print("search----->", search)

    businesses = Business.query.join(Item).filter(((Business.name.like(f"%{search}%")) | (Business.category.like(f"%{search}%")) | (Item.name.like(f"%{search}%")) | (Item.category.like(f"%{search}%")))).all()
    return {'Businesses': [bus.to_dict() for bus in businesses]}

@business_routes.route('/<int:id>')
def get_one_business(id):
    """
    Return 1 business info by id
    """
    business = Business.query.get(id)
    return {'Business': business.to_dict()}
