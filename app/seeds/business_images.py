from app.models import db, BusinessImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_business_images():

    urls = ['https://tb-static.uber.com/prod/image-proc/processed_images/0b052f97b0251c750d797b240b40a7ed/c73ecc27d2a9eaa735b1ee95304ba588.jpeg', 'https://tb-static.uber.com/prod/image-proc/processed_images/bda7434ed319a9c2dccb07c7d07d66c6/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg', 'https://d1ralsognjng37.cloudfront.net/c4e9abc0-8081-411c-a2bf-0623fa95f11d.jpeg', 'https://d1ralsognjng37.cloudfront.net/26b76b42-72e0-42aa-84f9-741905f6040d.jpeg', 'https://d1ralsognjng37.cloudfront.net/7dd73c61-a856-462a-9bef-35e6ff7318e6.jpeg', 'https://tb-static.uber.com/prod/image-proc/processed_images/06f7b5d5defe38d9cef8f5497e7b9ee2/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg', "https://hips.hearstapps.com/hmg-prod/images/what-is-boba-1586815097.jpg", 'https://d1ralsognjng37.cloudfront.net/b7e34e63-9407-4a28-89ca-c89714110198.jpeg', 'https://img.ctykit.com/cdn/ca-dtla/images/tr:w-1800/business-urth-caffe.jpg', 'https://tb-static.uber.com/prod/image-proc/processed_images/52ad0490a1a1969e74952b12fab736bd/c73ecc27d2a9eaa735b1ee95304ba588.jpeg', 'https://tb-static.uber.com/prod/image-proc/processed_images/fee7ec16b904939b276b332a0f88dd1e/c73ecc27d2a9eaa735b1ee95304ba588.jpeg', 'https://tb-static.uber.com/prod/image-proc/processed_images/75fbff811e8fe514976aeeb603b58558/16bb0a3ab8ea98cfe8906135767f7bf4.jpeg']

    images = [BusinessImage(
        business_id = i+1,
        url = urls[i],
        preview=True
        ) for i in range(len(urls))]

    add_business_images = [db.session.add(img) for img in images]
    db.session.commit()


def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_image RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_image"))

    db.session.commit()
