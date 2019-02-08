const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    city: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    price: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        default: 0
    },
    details: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: String
    },
    reviews: {
        type: String
    }
});

module.exports = mongoose.model('Hotel', HotelSchema);