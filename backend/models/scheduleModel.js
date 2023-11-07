// scheduleModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('BookingModel',bookingSchema)


/*
const bookingModel = mongoose.model('bookingModel', bookingSchema);

module.exports = bookingModel;

bookingModel.find()

*/