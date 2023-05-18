from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io',
        phone_number='1234567890',
        first_name='Demo',
        last_name='Lition',
        address='123 Sushi Ln',
        city='Los Angeles',
        state='CA',
        password='password')
    kevin = User(
        email='kevin@aa.io',
        phone_number='0987654321',
        first_name='Kevin',
        last_name='Burger',
        address='123 Burger Rd',
        city='Los Angeles',
        state='CA',
        password='password')
    joe = User(
        email='joe@aa.io',
        phone_number='4567890123',
        first_name='Joe',
        last_name='Burrito',
        address='123 Burrito St',
        city='Los Angeles',
        state='CA',
        password='password')
    mari = User(
        email='mari@aa.io',
        phone_number='7890123456',
        first_name='Mari',
        last_name='Steak',
        address='123 Steak Blvd',
        city='Los Angeles',
        state='CA',
        password='password')
    alan = User(
        email='alan@aa.io',
        phone_number='0123456789',
        first_name='Alan',
        last_name='Soup',
        address='123 Soup Dr',
        city='Los Angeles',
        state='CA',
        password='password')
    alan2 = User(
        email='alan2@aa.io',
        phone_number='2345678901',
        first_name='Alan',
        last_name='HotPot',
        address='123 HotPot Dr',
        city='Los Angeles',
        state='CA',
        password='password')
    dorian = User(
        email='dorian@aa.io',
        phone_number='5678901234',
        first_name='Dorian',
        last_name='Ramen',
        address='123 Ramen St',
        city='Los Angeles',
        state='CA',
        password='password')
    bianca = User(
        email='bianca@aa.io',
        phone_number='6789012345',
        first_name='Bianca',
        last_name='Pozole',
        address='123 Pozole Ln',
        city='Los Angeles',
        state='CA',
        password='password')
    roslyn = User(
        email='roslyn@aa.io',
        phone_number='6578901234',
        first_name='Roslyn',
        last_name='Pizza',
        address='123 Pizza Rd',
        city='Los Angeles',
        state='CA',
        password='password')



    db.session.add(demo)
    db.session.add(kevin)
    db.session.add(joe)
    db.session.add(mari)
    db.session.add(alan)
    db.session.add(alan2)
    db.session.add(dorian)
    db.session.add(bianca)
    db.session.add(roslyn)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user"))

    db.session.commit()
