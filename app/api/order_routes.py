from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Cart, Order, db

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

@order_routes.route('cart/<int:cart_id>', methods=['DELETE'])
@login_required
def delete_cart(cart_id):
    """
    Delete a cart.
    """
    server_id = current_user.to_dict()['id']
    server_cart = Cart.query.get(cart_id)
    # print("THIS IS THE REQUEST ------->", data)
    if (not server_cart):
        return {'errors': "cart not found"}, 400
    if (server_id != server_cart.user_id):
        return {'errors': "can only delete your own cart"}, 403

    #delete cart
    db.session.delete(server_cart)
    db.session.commit()

    return {"message":f"Successfully deleted cart {cart_id}"}

@order_routes.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    """
    Delete an order.
    """
    server_id = current_user.to_dict()['id']
    server_order = Order.query.get(order_id)
    # print("THIS IS THE REQUEST ------->", data)
    if not server_order:
        return {'errors': "order not found"}, 400
    if (server_id != server_order.cart_info.user_id):
        return {'errors': "can only delete your own order"}, 403

    #delete order
    db.session.delete(server_order)
    db.session.commit()

    return {"message":f"Successfully deleted order {order_id}"}
