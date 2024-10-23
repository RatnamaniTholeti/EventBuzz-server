// Event Model
// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    showType: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    organiser: { type: String, required: true },
    availableTickets: { type: Number, required: true },
    timeSlots: [{ type: String, required: true }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
