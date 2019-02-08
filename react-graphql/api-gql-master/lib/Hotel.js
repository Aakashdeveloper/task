const asyncLoop = require('node-async-loop');
const Hotel = require('../models/Hotel');
const BookHotel = require('../models/BookHotel');
const joiValidation = require('../validation/hotel');

module.exports = {
    createHotel(input) {
        return new Promise(async (resolve) => {
            let validation = await joiValidation.validateCreateHotelInput(input);
            if (validation.error) return resolve({ errors: validation.error, result: {} });
            new Hotel(validation.value).save((error, data) => {
                if (error) return resolve({ errors: [{ key: 'custom', value: 'Internal server error' }], result: {} });
                return resolve({
                    errors: [],
                    result: data
                });
            });
        });
    },
    createReservation(input) {
        return new Promise(async (resolve) => {
            let validation = await joiValidation.validateHotelReservationInput(input);
            if (validation.error) return resolve({ errors: validation.error, result: {} });
            new BookHotel(validation.value).save((error, data) => {
                if (error) return resolve({ errors: [{ key: 'custom', value: 'Internal server error' }], result: {} });
                Hotel.findOne({ _id: data.fkHotelId }, (err, res) => {
                    if (err) return resolve({ errors: [{ key: 'custom', value: 'Internal server error' }], result: {} });
                    return resolve({
                        errors: [],
                        result: res
                    });
                });
            });
        });
    },
    getAllReservationHotels() {
        return new Promise(resolve => {
            BookHotel.find({}, (error, data) => {
                if (error) return resolve({ result: [] });
                if (data.length > 0) {
                    const arrData = [];
                    return asyncLoop(data, (items, next) => {
                        Hotel.findOne({ _id: items.fkHotelId }, (err, item) => {
                            if (err) return resolve({ result: [] });
                            if (item) {
                                arrData.push({
                                    _id: item._id,
                                    reservationId: items._id,
                                    name: item.name,
                                    city: item.city,
                                    price: item.price,
                                    distance: item.distance,
                                    details: item.details,
                                    image: item.image,
                                    rating: item.rating,
                                    reviews: item.reviews,
                                    reservationAt: items.reservationAt
                                });
                            }
                            next();
                        })
                    }, () => resolve({ result: arrData }))
                }
                return resolve({ result: [] });
            });
        });
    },
    getAllHotels() {
        return new Promise(resolve => {
            Hotel.find({}, (error, data) => {
                if (error) return resolve({ result: [] });
                return resolve({ result: data });
            })
        })
    },
}