const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    seats: { type: [String], required: true },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed'], 
        default: 'Pending' 
    }, // Payment status can only be 'Pending' or 'Confirmed'
    bookingStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed'], 
        default: 'Confirmed' 
    }, // Booking status can only be 'Pending' or 'Confirmed'
    bookingTime: { 
        type: Date, 
        default: Date.now 
    }, // Automatically set to the current time
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
