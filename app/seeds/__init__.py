from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .business_images import seed_business_images, undo_business_images
from .reviews import seed_reviews, undo_reviews
from .items import seed_items, undo_items
from .item_images import seed_item_images, undo_item_images
from .carts import seed_carts, undo_carts
from .orders import seed_orders, undo_orders

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_orders()
        undo_carts()
        undo_item_images()
        undo_items()
        undo_reviews()
        undo_business_images()
        undo_businesses()
        undo_users()
    seed_users()
    # Add other seed functions here
    seed_businesses()
    seed_business_images()
    seed_reviews()
    seed_items()
    seed_item_images()
    seed_carts()
    seed_orders()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_orders()
    undo_carts()
    undo_item_images()
    undo_items()
    undo_reviews()
    undo_business_images()
    undo_businesses()
    undo_users()
