from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():
    carts = [Cart(business_id=i) for i in range(1,10) ]
    add_carts = [db.session.add(cart) for cart in carts]
    db.session.commit()
    print(f'added {len(carts)} carts')


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart"))

    db.session.commit()
