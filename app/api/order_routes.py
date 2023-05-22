from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Cart, Order, db
from app.forms import OrderForm

order_routes = Blueprint('order', __name__)

@order_routes.route('', methods=['POST'])
@login_required
def make_cart_and_orders():
    """
    Make a cart and attach orders to it.
    """
    server_id = current_user.to_dict()['id']
    data = request.get_json()
    # print("THIS IS THE REQUEST ------->", data)
    if (server_id != data["user_id"]):
        return {'errors': "bad user_id"}, 401

    #create new cart
    new_cart = Cart(business_id=data["business_id"], user_id=data["user_id"])
    db.session.add(new_cart)
    db.session.commit()

    #create orders for cart
    new_cart_id = Cart.query.filter(Cart.user_id == data["user_id"], Cart.business_id == data["business_id"]).order_by(Cart.id.desc()).first().id
    for id in data["item_ids"]:
        new_order = Order(user_id=data["user_id"], item_id=id, cart_id=new_cart_id)
        db.session.add(new_order)
    db.session.commit()

    return {"message":f"Successfully added {len(data['item_ids'])} orders for user {data['user_id']}"}
    # businesses = Business.query.all()
    # return {'Businesses': [bus.to_dict() for bus in businesses]}
