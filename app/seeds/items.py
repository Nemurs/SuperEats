from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

from random import randint

from faker import Faker
fake = Faker()


def seed_items():

    item_names = ['SonoraTown', 'Erewhon', 'California Chicken Cafe', 'Din Tai Fung', 'Meizhou Dongpo',
                  'Main Chick Hot Chicken', "Noble Tea", 'Mizlala West Adams', 'Urth Caffe', 'Magnolia Bakery', 'Pizzana', '7-Eleven']

    items = [[
        Item(
            name='Chivichanga',
            price=6.00,
            category='From the Grill',
            business_id=1),
        Item(
            name='Chivi Party (8 small burritos)',
            price=42.00,
            category='Large format Menu',
            business_id=1),
        Item(
            name='Caramelo',
            price=8.25,
            category='From the Grill',
            business_id=1),
        Item(
            name='Handmade Flour Tortillas',
            price=7.25,
            category='La Bodega',
            business_id=1),
    ],
    [
        Item(
            name='Organic Yellow Banana',
            price=1.38,
            category='Fruits & Vegetables',
            business_id=2),
        Item(
            name="Organic Green Onion (1 ct)",
            price=2.12,
            category='Fruits & Vegetables',
            business_id=2),
        Item(
            name='Center Cut Skin on Norweigen Salmon',
            price=32.08,
            category='Meat, Seafood & Plant-Based',
            business_id=2),
        Item(
            name='Vital Farms Pasture-Raised Large Eggs (18 ct)',
            price=11.75,
            category='Dairy & Eggs',
            business_id=2),
    ],
    [
        Item(
            name='California Chicken Salad',
            price=17.00,
            category='Salads',
            business_id=3),
        Item(
            name="Chinese Chicken Salad",
            price=16.25,
            category='Salads',
            business_id=3),
        Item(
            name='Chinese Chicken Salad',
            price=13.00,
            category='Wraps',
            business_id=3),
        Item(
            name='Whole Chicken',
            price=19.25,
            category='Rotisserie',
            business_id=3),
    ],
    [
        Item(
            name='Cucumber Salad',
            price=8.00,
            category='Appetizers',
            business_id=4),
        Item(
            name="Kurobuta Pork Xiao Long Bao (10 each)",
            price=16.50,
            category='Xiao Long Bao (Soup Dumplings)',
            business_id=4),
        Item(
            name='Vegan Spicy Wontons (8 each)',
            price=16.00,
            category='Wontons',
            business_id=4),
        Item(
            name='Braised Beef Noodle Soup',
            price=18.50,
            category='Noodle Soups',
            business_id=4),
    ],
    [
        Item(
            name='Roast Duck Sliders',
            price=15.99,
            category='Special',
            business_id=5),
        Item(
            name="Cold Noodle",
            price=13.99,
            category='Appetizers',
            business_id=5),
        Item(
            name='Wok-Fried Lobster Tail',
            price=79.99,
            category='Seafood',
            business_id=5),
        Item(
            name='Serrano Pepper Beef',
            price=31.99,
            category='Beef & Lamb',
            business_id=5),
    ],
    [
        Item(
            name='Dark Meat Sandwich',
            price=6.49,
            category='Main Menu',
            business_id=6),
        Item(
            name="Combo 6",
            price=17.49,
            category='Main Menu',
            business_id=6),
        Item(
            name='Combo 2. 3 Tender & Side of Fries',
            price=16.49,
            category='Main Menu',
            business_id=6),
        Item(
            name='Creamy Coleslaw',
            price=5.99,
            category='Sides',
            business_id=6),
    ],
    [
        Item(
            name='Thai Milk Tea',
            price=5.5,
            category='Milk Teas - All Large Size',
            business_id=7),
        Item(
            name="Boba Milk Tea",
            price=5.45,
            category='Milk Teas - All Large Size',
            business_id=7),
        Item(
            name='Passion Fruit Tea',
            price=5.75,
            category='Flavor Teas - All Large Size',
            business_id=7),
        Item(
            name='Fresh Grapefruit Tea',
            price=5.75,
            category='Flavor Teas - All Large Size',
            business_id=7),
    ],
    [
        Item(
            name='Falafel Plate.',
            price=18.95,
            category='Plates',
            business_id=8),
        Item(
            name="Fish Kebab Salad.",
            price=22.95,
            category='Salads',
            business_id=8),
        Item(
            name='Schnitzel Salad.',
            price=19.95,
            category='Salads',
            business_id=8),
        Item(
            name='Shewarma Pita.',
            price=11.95,
            category='Pita',
            business_id=8),
    ],
    [
        Item(
            name='Avocado Toast',
            price=13.95,
            category='All Day Brunch',
            business_id=9),
        Item(
            name="Banana Walnut Waffle",
            price=13.5,
            category='All Day Brunch',
            business_id=9),
        Item(
            name='Pizza El Diablo',
            price=17.95,
            category='Urth Pizza',
            business_id=9),
        Item(
            name='Grilled Cilantro Chicken with Pesto Sandwich - Full',
            price=15.95,
            category='Sandwiches',
            business_id=9),
    ],
    [
        Item(
            name='Classic Banana Pudding Large to go',
            price=9.45,
            category='Banana Pudding (Online)',
            business_id=10),
        Item(
            name="Red Velvet Cake Slice to go",
            price=8.45,
            category='Cupcakes & Cakes (Online)',
            business_id=10),
        Item(
            name='Six Choc/Choc Cupcakes to go',
            price=26.25,
            category='Cupcakes & Cakes (Online)',
            business_id=10),
        Item(
            name='Blondie with Choc Chunks to go',
            price=4.2,
            category='Cookie & Bars (Online)',
            business_id=10),
    ],
    [
        Item(
            name='CARCIOFI ARROSTITI',
            price=18.00,
            category='ANTIPASTI',
            business_id=11),
        Item(
            name="CESARE SALAD",
            price=18.00,
            category='INSALATE',
            business_id=11),
        Item(
            name='MARGHERITA PIZZA',
            price=24.00,
            category='PIZZA',
            business_id=11),
        Item(
            name='PEPPERONI PIZZA',
            price=26.00,
            category='PIZZA',
            business_id=11),
    ],
    [
        Item(
            name='7-Select Purified Water Gallon',
            price=3.29,
            category='Drinks',
            business_id=11),
        Item(
            name="Monster 16oz",
            price=3.69,
            category='Drinks',
            business_id=11),
        Item(
            name='Chesters Hot Fries 3.625 oz',
            price=2.49,
            category='Snacks',
            business_id=11),
        Item(
            name='Gushers Tropical 4.25oz',
            price=3.39,
            category='Candy',
            business_id=11),
    ]
    ]

    add_items = [db.session.add(itm) for itm_lst in items for itm in itm_lst]
    db.session.commit()
    print(f'added {len(items)*4} items')


def undo_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.item RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM item"))

    db.session.commit()
