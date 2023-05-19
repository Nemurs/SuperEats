from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():
    orders_1 = [Order(user_id=1, cart_id=1, item_id=i) for i in range(1, 5)]
    orders_2 = [Order(user_id=2, cart_id=2, item_id=i) for i in range(5, 9)]
    orders_3 = [Order(user_id=3, cart_id=3, item_id=i) for i in range(9, 13)]
    orders_4 = [Order(user_id=4, cart_id=4, item_id=i) for i in range(13, 17)]
    orders_5 = [Order(user_id=5, cart_id=5, item_id=i) for i in range(17, 21)]
    orders_6 = [Order(user_id=6, cart_id=6, item_id=i) for i in range(21, 25)]
    orders_7 = [Order(user_id=7, cart_id=7, item_id=i) for i in range(25, 29)]
    orders_8 = [Order(user_id=8, cart_id=8, item_id=i) for i in range(29, 33)]
    orders_9 = [Order(user_id=9, cart_id=9, item_id=i) for i in range(33, 37)]

    orders = [*orders_1, *orders_2, *orders_3, *orders_4, *orders_5, *orders_6, *orders_7, *orders_8, *orders_9]
    # orders = [ord.to_dict_no_items() for ord in orders]
    # print(orders)
    add_orders = [db.session.add(order) for order in orders]
    db.session.commit()
    print(f'added {len(orders)} orders')


def undo_orders():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.all_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM all_orders"))

    db.session.commit()
