# SuperEats

Please visit my website at:

[supereats.onrender.com]


![Splash Page](https://github.com/Nemurs/SuperEats/assets/118857412/0f8fb9c5-fdd9-4f57-8c2b-6cd90034a46e)


For more info about this project please check out my [wiki]!


# API Routes

## \~Users~

### POST api/auth/signup
Sign up and automatically log in user.

Request:
* Headers:
    * Content-Type: application/json
* Body ("artist" field not required):

    ```json
    {
        "email": "super@eats.io",
        "password": "password",
        "first_name": "Demo",
        "last_name": "User",
        "phone_number": "31012345678",
        "address": "123 Sesame St",
        "city": "Los Angeles",
        "state": "CA"
    }
    ```

Successful Response Body:
```json
{
    "id": 1,
    "address": "123 Sesame St",
    "city": "Los Angeles",
    "email": "super@eats.io",
    "firstName": "Demo",
    "lastName": "User",
    "phoneNumber": "31012345678",
    "state": "CA",
    "images": [],
    "userCarts": [],
    "userOrders": [],
    "userReviews": []
}
```
________________
### POST api/auth/login
Log in a user.

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "email": "super@eats.io",
        "password": "password"
    }
    ```

Successful Response Body:
```json
{
    "id": 1,
    "address": "123 Sesame St",
    "city": "Los Angeles",
    "email": "super@eats.io",
    "firstName": "Demo",
    "lastName": "User",
    "phoneNumber": "31012345678",
    "state": "CA",
    "images": [
        {
            "id": 1,
            "preview": true,
            "url": "https://seeklogo.com/images/T/teenage-mutant-ninja-turtles-logo-CA38586452-seeklogo.com.png",
            "userId": 1
        }
    ],
    "userCarts": [
        {
            "businessId": 1,
            "businessName": "SonoraTown",
            "id": 1,
            "timeCreated": "Mon, 19 Jun 2023 17:13:37 GMT",
            "timeUpdated": null,
            "userId": 1
        }
    ],
    "userOrders": [
        {
            "cartId": 1,
            "cartInfo": {
                "businessId": 1,
                "businessName": "SonoraTown",
                "id": 1,
                "timeCreated": "Mon, 19 Jun 2023 17:13:37 GMT",
                "timeUpdated": null,
                "userId": 1
            },
            "id": 1,
            "item": {
                "business_id": 1,
                "category": "From the Grill",
                "id": 1,
                "name": "Chivichanga",
                "price": 6.0
            },
            "itemId": 1,
            "user": {
                "address": "123 Sushi Ln",
                "city": "Los Angeles",
                "email": "demo@aa.io",
                "firstName": "Demo",
                "id": 1,
                "lastName": "Lition",
                "phoneNumber": "1234567890",
                "state": "CA"
            },
            "userId": 1
        },
    ],
    "userReviews": [
        {
            "businessId": 1,
            "cartId": 1,
            "id": 1,
            "rating": 5,
            "reviewText": "Awesome menu",
            "userFirstName": "Demo",
            "userId": 1
        }
    ]
}
```
________________
### GET api/auth/logout
Log out user.

Successful Response Body:
```json
{
    "message": "User logged out",
}
```
________________
## \~Businesses~


### GET api/business
Returns all the albums from the database.

Successful Response Body:
```json
{
    "Businesses": [
        {
            "address": "36322 James Spurs Suite 700",
            "avgItemPrice": 15.875,
            "businessRating": 5.0,
            "businessReviews": [
                {
                    "businessId": 1,
                    "cartId": 1,
                    "id": 1,
                    "rating": 5,
                    "reviewText": "Awesome menu",
                    "userFirstName": "Demo",
                    "userId": 1
                }
            ],
            "carts": [
                {
                    "businessId": 1,
                    "businessName": "SonoraTown",
                    "id": 1,
                    "timeCreated": "Mon, 19 Jun 2023 17:13:37 GMT",
                    "timeUpdated": null,
                    "userId": 1
                }
            ],
            "category": "Mexican",
            "city": "Los Angeles",
            "email": "SonoraTown@business.io",
            "id": 1,
            "images": [
                {
                    "businessId": 1,
                    "id": 1,
                    "preview": true,
                    "url": "https://tb-static.uber.com/prod/image-proc/processed_images/0b052f97b0251c750d797b240b40a7ed/c73ecc27d2a9eaa735b1ee95304ba588.jpeg"
                }
            ],
            "items": [
                {
                    "business": {
                        "address": "36322 James Spurs Suite 700",
                        "businessRating": 5.0,
                        "category": "Mexican",
                        "city": "Los Angeles",
                        "email": "SonoraTown@business.io",
                        "id": 1,
                        "name": "SonoraTown",
                        "phoneNumber": "3232227304",
                        "state": "CA"
                    },
                    "business_id": 1,
                    "category": "From the Grill",
                    "id": 1,
                    "images": [
                        {
                            "id": 1,
                            "itemId": 1,
                            "preview": true,
                            "url": "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMGU4ZTdlOWRlY2ZhZWI1MDIwOTMzOWZhYjYxMGMwYjkvNTk1NGJjYjAwNmIxMGRiZmQwYmMxNjBmNjM3MGZhZjMuanBlZw=="
                        }
                    ],
                    "itemOrders": [
                        {
                            "cartId": 1,
                            "id": 1,
                            "itemId": 1,
                            "userId": 1
                        }
                    ],
                    "name": "Chivichanga",
                    "price": 6.0
                }
            ]
        }
    ]
}
```

________________
### GET api/business/:businessId
Returns one album and all of its songs from the database.

Successful Response Body:
```json
{
    "Businesses":
        {
            "address": "36322 James Spurs Suite 700",
            "avgItemPrice": 15.875,
            "businessRating": 5.0,
            "businessReviews": [
                {
                    "businessId": 1,
                    "cartId": 1,
                    "id": 1,
                    "rating": 5,
                    "reviewText": "Awesome menu",
                    "userFirstName": "Demo",
                    "userId": 1
                }
            ],
            "carts": [
                {
                    "businessId": 1,
                    "businessName": "SonoraTown",
                    "id": 1,
                    "timeCreated": "Mon, 19 Jun 2023 17:13:37 GMT",
                    "timeUpdated": null,
                    "userId": 1
                }
            ],
            "category": "Mexican",
            "city": "Los Angeles",
            "email": "SonoraTown@business.io",
            "id": 1,
            "images": [
                {
                    "businessId": 1,
                    "id": 1,
                    "preview": true,
                    "url": "https://tb-static.uber.com/prod/image-proc/processed_images/0b052f97b0251c750d797b240b40a7ed/c73ecc27d2a9eaa735b1ee95304ba588.jpeg"
                }
            ],
            "items": [
                {
                    "business": {
                        "address": "36322 James Spurs Suite 700",
                        "businessRating": 5.0,
                        "category": "Mexican",
                        "city": "Los Angeles",
                        "email": "SonoraTown@business.io",
                        "id": 1,
                        "name": "SonoraTown",
                        "phoneNumber": "3232227304",
                        "state": "CA"
                    },
                    "business_id": 1,
                    "category": "From the Grill",
                    "id": 1,
                    "images": [
                        {
                            "id": 1,
                            "itemId": 1,
                            "preview": true,
                            "url": "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMGU4ZTdlOWRlY2ZhZWI1MDIwOTMzOWZhYjYxMGMwYjkvNTk1NGJjYjAwNmIxMGRiZmQwYmMxNjBmNjM3MGZhZjMuanBlZw=="
                        }
                    ],
                    "itemOrders": [
                        {
                            "cartId": 1,
                            "id": 1,
                            "itemId": 1,
                            "userId": 1
                        }
                    ],
                    "name": "Chivichanga",
                    "price": 6.0
                }
            ]
        }
}
```
________________
## \~Orders & Carts ~

### POST api/order
Make a cart and attach orders to it*

\* Login REQUIRED

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "user_id": 1,
        "business_id": 1,
        "item_ids": [
            1,
            2,
            3
        ]
    }
    ```

Successful Response Body:
```json
{
    "message": "Successfully added 3 orders for user 1"
}
```
Error Response 403: Unauthorized

```json
{
    "errors": "bad user_id"
}
```
________________
### DELETE api/cart/:cartId
Delete a cart

\* Login REQUIRED and User MUST own the cart

Successful Response Body:
```json
{
	"message":  "Successfully deleted order :cartId"
}
```
Error Response 400: Bad Request

```json
{
    "errors": "cart not found"
}
```
Error Response 403: Unauthorized

```json
{
    "errors": "can only delete your own cart"
}

________________
### DELETE api/order/:orderId
Delete an order

\* Login REQUIRED and User MUST own the order

Successful Response Body:
```json
{
	"message":  "Successfully deleted order :orderId"
}
```
Error Response 400: Bad Request

```json
{
    "errors": "order not found"
}
```
Error Response 403: Unauthorized

```json
{
    "errors": "can only delete your own order"
}
```
________________
## \~Reviews~


________________
### POST api/review
Create a review*

\* Login REQUIRED

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "review_text": "This place is bussin'",
        "rating": 5,
        "business_id": 1,
        "user_id": 1,
        "cart_id": 1
    }
    ```

Successful Response Body:
```json
    {
        "message": "Successfully added review for user 1"
    }
```
Error Response 403: Unauthorized

```json
{
    "errors": "bad user_id"
}
```

________________
### PUT api/review/:reviewId
Update a review*

\* Login REQUIRED and User MUST own the review

Request:
* Headers:
    * Content-Type: application/json
* Body (all fields required):

    ```json
    {
        "review_text": "This place is bussin'",
        "rating": 5
    }
    ```

Successful Response Body:
```json
    {
        "message": "Successfully edited review for user 1"
    }
```
Error Response 403: Unauthorized

```json
{
    "errors": "can only edit your own review"
}
```

________________
### DELETE api/review/:reviewId
Deletes a review*

\* Login REQUIRED and User MUST own the review

Successful Response Body:
Successful Response Body:
```json
    {
        "message": "Successfully delete review 1"
    }
```
Error Response 403: Unauthorized

```json
{
    "errors": "can only delete your own review"
}
```

[wiki]: https://github.com/Nemurs/SuperEats/wiki
[supereats.onrender.com]: https://supereats.onrender.com/
