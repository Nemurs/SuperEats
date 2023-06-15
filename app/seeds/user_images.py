from app.models import db, UserImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_images():

    urls = ['https://seeklogo.com/images/T/teenage-mutant-ninja-turtles-logo-CA38586452-seeklogo.com.png', 'https://cdn.shopify.com/s/files/1/0279/0234/5304/products/wpkmq6z6ljpruzqgivtk.jpg?v=1674117853&width=1946', 'https://www.clipartmax.com/png/middle/301-3013181_ninja-turtles-face-clipart-collection-ninja-turtles-michelangelo-face.png', 'https://i.pinimg.com/originals/48/12/6f/48126f113433b0e729e0fc4943282291.png']

    images = [UserImage(
        user_id = i+1,
        url = urls[i],
        preview=True
        ) for i in range(len(urls))]

    add_user_images = [db.session.add(img) for img in images]
    db.session.commit()


def undo_user_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_image RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_image"))

    db.session.commit()
