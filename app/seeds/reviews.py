from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

from random import choice, randint


def seed_reviews():

    positive_reviews = ['Delicious!', 'Really cool!', 'My Fave!!!!!', 'Awesome place', 'Price is good!', 'THIS PLACE SMACKS', "Delicious food!", "Great service", "Amazing ambiance", "Perfectly cooked steak", "Friendly staff", "Awesome menu", "Excellent drinks", "Cozy atmosphere", "Mouthwatering desserts", "Quick and tasty", "Lovely presentation", "Outstanding flavors", "Top-notch dining", "Impressive selection", "Delightful experience", "Fantastic cocktails", "Yummy appetizers", "Satisfied taste buds", "Well-priced meals", "Highly recommended"]

    average_reviews = ['It was alright', 'Really mid', 'Good but not great', 'Chill place', 'Could be better value', 'Not bad tbh', "Good food", "Nice ambiance", "Friendly staff", "Decent prices", "Clean establishment", "Average experience", "Tasty dishes", "Convenient location", "Prompt service", "Fair portion sizes", "Standard menu", "Satisfactory meal", "Acceptable wait time", "Adequate seating", "Plain decor", "Okay atmosphere", "Reasonable prices", "Mediocre experience", "Edible food", "Fine dining"]

    bad_reviews = ['It was bad', 'Not good', 'Overpriced and OverHyped!','Service sucked', 'Parking is bad', 'Too crowded', "Bad service.", "Cold food.", "Terrible experience.", "Overpriced and disappointing.", "Worst meal ever!", "Rude staff.", "Unpleasant ambiance.", "Awful food quality.", "Nothing special.", "Horrible service.", "Not worth it.", "Disgusting flavors.", "Extremely slow service.", "Unappetizing presentation.", "Avoid this place.", "Lousy customer service.", "Tasteless dishes.", "Total disappointment.", "Poor value for money.", "Never coming back."]

    good_revs1 = [Review(
        review_text=choice(positive_reviews),
        rating=randint(4, 5),
        business_id=i,
        user_id=i,
        cart_id=i
    ) for i in range(1, 10)]

    # good_revs2 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=2
    # ) for i in range(1, 13)]

    # good_revs3 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=4
    # ) for i in range(1, 13)]

    # good_revs4 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=6
    # ) for i in range(1, 13)]

    # good_revs5 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=7
    # ) for i in range(1, 13)]

    # good_revs6 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=8
    # ) for i in range(1, 13)]

    # good_revs7 = [Review(
    #     review_text=choice(positive_reviews),
    #     rating=randint(4, 5),
    #     business_id=i,
    #     user_id=9
    # ) for i in range(1, 13)]

    avg_revs = [Review(
        review_text=choice(average_reviews),
        rating=3,
        business_id=i,
        user_id=1,
        cart_id=i+8
    ) for i in range(2, 4)]

    bad_revs = [Review(
        review_text=choice(bad_reviews),
        rating=randint(1, 2),
        business_id=8,
        user_id=2,
        cart_id=12
    )]

    reviews = [*good_revs1, *avg_revs, *bad_revs]
    # print([reviews[i].to_dict_no_items() for i in range(len(reviews))])
    # print (len(reviews))
    add_reviews = [db.session.add(rev) for rev in reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review"))

    db.session.commit()
