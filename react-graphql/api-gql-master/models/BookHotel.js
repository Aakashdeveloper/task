const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookHotelSchema = new Schema({
    fkHotelId: {
        type: String,
        ref: 'Hotel'
    },
    reservationAt: {
        type: String
    }
});

module.exports = mongoose.model('BookHotel', BookHotelSchema);