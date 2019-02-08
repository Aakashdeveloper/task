API for Hotel Reservations
==========================

## Introduction
This is a backend application developed using nodejs and graphql.

## Dependencies
  - Nodejs >=8.x.x
  - Mongodb >=4.x.x
  
### How it works
In application root path run following commands
```bash
npm install
npm start
```

### API Request
1. **Create Hotel with Blank fields.**
```
mutation {
  createHotel(input: {name: "", city: "", price:0, distance: 0, details: "", image: "", rating: "", reviews: ""}) {
    errors {
      key
      value
    }
    result {
      _id
      name
      city
      price
      distance
      details
      image
      rating
      reviews
    }
  }
}

```
**Output for the above request**
```
{
  "data": {
    "createHotel": {
      "errors": [
        {
          "key": "name",
          "value": "Name is not allowed to be empty"
        },
        {
          "key": "name",
          "value": "Name length must be at least 3 characters long"
        },
        {
          "key": "city",
          "value": "City is not allowed to be empty"
        },
        {
          "key": "city",
          "value": "City length must be at least 3 characters long"
        }
      ],
      "result": {
        "_id": null,
        "name": null,
        "city": null,
        "price": null,
        "distance": null,
        "details": null,
        "image": null,
        "rating": null,
        "reviews": null
      }
    }
  }
}
```
2. **Create Hotel with valid input.**
```
mutation {
  createHotel(input: {
    name: "Hilton Garden Inn New York/Times Square Central",
    city: "Times Square Central",
    price:106,
    distance: 2,
    details: "Newly-built hotel with contemporary guestrooms on famous 42nd Street, steps from Broadway theaters, Madame Tussauds, restaurants, dining and nightlife.",
    image: "https://www3.hilton.com/resources/media/hp/NYCFFHX/en_US/img/hotel/photogallery/HX_lobby002.jpg",
    rating: "4.4",
    reviews: "4 Reviews"
  }) {
    errors {
      key
      value
    }
    result {
      _id
      name
      city
      price
      distance
      details
      image
      rating
      reviews
    }
  }
}
```
**Output for the above request**
```
{
  "data": {
    "createHotel": {
      "errors": [],
      "result": {
        "_id": "5c3f8cfd52be600bf8241de5",
        "name": "Hilton Garden Inn New York/Times Square Central",
        "city": "Times Square Central",
        "price": 106,
        "distance": 2,
        "details": "Newly-built hotel with contemporary guestrooms on famous 42nd Street, steps from Broadway theaters, Madame Tussauds, restaurants, dining and nightlife.",
        "image": "https://www3.hilton.com/resources/media/hp/NYCFFHX/en_US/img/hotel/photogallery/HX_lobby002.jpg",
        "rating": "4.4",
        "reviews": "4 Reviews"
      }
    }
  }
}
```
3. **Book Hotel with invalid input.**
```
mutation{
  createReservation(input:{fkHotelId:"",reservationAt:""}){
    errors{
      key
      value
    },
    result{
      _id
      name
      city
      price
      distance
      details
      image
      rating
      reviews
    }
  }
}
```
**Output for the above request**
```
{
  "data": {
    "createReservation": {
      "errors": [
        {
          "key": "fkHotelId",
          "value": "Hotel ID is not allowed to be empty"
        },
        {
          "key": "reservationAt",
          "value": "Reservation Date is not allowed to be empty"
        }
      ],
      "result": {
        "_id": null,
        "name": null,
        "city": null,
        "price": null,
        "distance": null,
        "details": null,
        "image": null,
        "rating": null,
        "reviews": null
      }
    }
  }
}
```
4. **Book Hotel with valid input.**
```
mutation{
  createReservation(input:{fkHotelId:"5c3f8cfd52be600bf8241de5",reservationAt:"2019-02-05"}){
    errors{
      key
      value
    },
    result{
      _id
      name
      city
      price
      distance
      details
      image
      rating
      reviews
    }
  }
}
```
**Output for the above request**
```
{
  "data": {
    "createReservation": {
      "errors": [],
      "result": {
        "_id": "5c3f8cfd52be600bf8241de5",
        "name": "Hilton Garden Inn New York/Times Square Central",
        "city": "Times Square Central",
        "price": 106,
        "distance": 2,
        "details": "Newly-built hotel with contemporary guestrooms on famous 42nd Street, steps from Broadway theaters, Madame Tussauds, restaurants, dining and nightlife.",
        "image": "https://www3.hilton.com/resources/media/hp/NYCFFHX/en_US/img/hotel/photogallery/HX_lobby002.jpg",
        "rating": "4.4",
        "reviews": "4 Reviews"
      }
    }
  }
}
```
5. **Get All Hotel with no input.**
```
query{
  getAllHotels{
    result{
      _id
      name
      city
      price
      distance
      details
      image
      rating
      reviews
    }
  }
}
```
**Output for the above request**
```
{
  "data": {
    "getAllHotels": {
      "result": [
        {
          "_id": "5c3f8cfd52be600bf8241de5",
          "name": "Hilton Garden Inn New York/Times Square Central",
          "city": "Times Square Central",
          "price": 106,
          "distance": 2,
          "details": "Newly-built hotel with contemporary guestrooms on famous 42nd Street, steps from Broadway theaters, Madame Tussauds, restaurants, dining and nightlife.",
          "image": "https://www3.hilton.com/resources/media/hp/NYCFFHX/en_US/img/hotel/photogallery/HX_lobby002.jpg",
          "rating": "4.4",
          "reviews": "4 Reviews"
        }
      ]
    }
  }
}
```
6. **Get All Reservation Hotel with no input.**
```
query{
  getAllReservationHotels{
    result{
      _id
      reservationId
      name
      city
      price
      distance
      details
      image
      rating
      reviews
      reservationAt
    }
  }
}
```
**Output for the above request**
```
{
  "data": {
    "getAllReservationHotels": {
      "result": [
        {
          "_id": "5c3f8cfd52be600bf8241de5",
          "reservationId": "5c3f8e5552be600bf8241de6",
          "name": "Hilton Garden Inn New York/Times Square Central",
          "city": "Times Square Central",
          "price": 106,
          "distance": 2,
          "details": "Newly-built hotel with contemporary guestrooms on famous 42nd Street, steps from Broadway theaters, Madame Tussauds, restaurants, dining and nightlife.",
          "image": "https://www3.hilton.com/resources/media/hp/NYCFFHX/en_US/img/hotel/photogallery/HX_lobby002.jpg",
          "rating": "4.4",
          "reviews": "4 Reviews",
          "reservationAt": "2019-02-05"
        }
      ]
    }
  }
}
```

## Environment variables
Environment variables is the main mechanism of manipulating application settings. Currently application recognizes
following environment variables:

| Variable                       | Default value | Description             |
| ------------------------------ | ------------- | ----------------------- |
| ENV                            | development   | Sets current environment. Allows application to manipulate some settings automatically |
| HOST                           | localhost      | Address to listen on   |
| PORT                           | 3500           | Port to listen on                     |
| End Point                      | http://localhost:3500/graphiql          |              |

## API Documentation
You can get API docs using /graphiql path
