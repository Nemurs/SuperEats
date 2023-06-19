from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text

from random import randint

from faker import Faker
fake = Faker()

def make_random_la_phone_number():
    area_codes = ['310', '323', '424', '213', '818', '562']
    nums = [randint(0,9) for i in range(7)]
    out = area_codes[randint(0,5)]
    for num in nums:
        out += str(num)
    return out

def seed_businesses():

    business_names = ['SonoraTown', 'Erewhon', 'California Chicken Cafe', 'Din Tai Fung', 'Meizhou Dongpo', 'Main Chick Hot Chicken', "Noble Tea", 'Mizlala West Adams', 'Urth Caffe', 'Magnolia Bakery', 'Pizzana', '7-Eleven']

    business_categories = ['Mexican', 'Grocery', 'Healthy', 'Chinese', 'Chinese', 'American', "Drinks", 'Middle Eastern', 'American', 'Dessert', 'Italian', 'Convenience']

    busisnesses = [Business(
        email=f'{business_names[i].replace(" ", "")}@business.io',
        phone_number=make_random_la_phone_number(),
        name=business_names[i],
        category=business_categories[i],
        address=fake.street_address(),
        city='Los Angeles',
        state='CA') for i in range(len(business_names))]

    add_businesses = [db.session.add(bus) for bus in busisnesses]
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business"))

    db.session.commit()
