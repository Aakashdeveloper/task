const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

/**
 * Starts: Validation schema
 */

// Define schema for create a user.
let createHotelSchema = Joi.object().keys({
    name: Joi.string().min(3).max(100).required().trim().label('Name'),
    city: Joi.string().min(3).max(100).required().trim().label('City'),
    price: Joi.number().integer().required().label('Price'),
    distance: Joi.number().integer().allow(0).optional().label('Distance'),
    details: Joi.string().allow('').optional().trim().label('Details'),
    image: Joi.string().allow('').optional().trim().label('Image'),
    rating: Joi.string().allow('').optional().trim().label('Rating'),
    reviews: Joi.string().allow('').optional().trim().label('Reviews')
});

let createHotelReservationSchema = Joi.object().keys({
    fkHotelId: Joi.string().required().trim().label('Hotel ID'),
    reservationAt: Joi.string().required().trim().label('Reservation Date')
});

/**
 * Call funcations.
 */
const validateCreateHotelInput = async (input) => await validateInput(input, createHotelSchema);
const validateHotelReservationInput = async (input) => await validateInput(input, createHotelReservationSchema);

// A function which is used for process all request.
const validateInput = (input, schema) => {
    return new Promise(resolve => {
        Joi.validate(input, schema, {
            abortEarly: false,
            language: {},
            escapeHtml: true,
            noDefaults: true
        }, (error, value) => {
            if (error) return resolve({
                error: error.details.map(item =>
                    ({ key: item.path[0], value: item.message.replace(new RegExp('"', 'g'), '') })
                )
            });
            return resolve({ error: null, value });
        });
    });
}

// Access methods out side used.
module.exports = {
    validateCreateHotelInput,
    validateHotelReservationInput
}