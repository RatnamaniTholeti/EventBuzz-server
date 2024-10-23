// Booking Controller
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Book Tickets
exports.bookTickets = async (req, res) => {
    const { userId, eventId, seats } = req.body;
    try {
        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if enough seats are available
        if (event.availableSeats < seats.length) {
            return res.status(400).json({ message: 'Not enough available seats' });
        }

        // Create a new booking with paymentStatus as 'Confirmed' and bookingStatus as 'Confirmed'
        const booking = new Booking({
            userId,
            eventId,
            seats,
            paymentStatus: 'Confirmed', // Set to 'Confirmed' initially
            bookingStatus: 'Confirmed',  // Set to 'Confirmed' initially
            bookingTime: new Date(),     // Current exact time
        });

        // Save the booking
        await booking.save();

        // Update the available seats count
        event.availableSeats -= seats.length;
        await event.save();

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error booking tickets' });
    }
};

// Booking Controller
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('eventId') // Populating event details
            .populate('userId'); // Populating user details (if you have a User model)
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching all bookings' });
    }
};

// Get User Bookings
exports.getUserBookings = async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ userId }).populate('eventId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params; // Booking ID
    const { bookingStatus } = req.body;

    // Ensure bookingStatus is either 'Pending' or 'Confirmed'
    if (!['Pending', 'Confirmed'].includes(bookingStatus)) {
        return res.status(400).json({ message: 'Invalid booking status. Must be either "Pending" or "Confirmed".' });
    }

    try {
        const booking = await Booking.findByIdAndUpdate(id, { bookingStatus }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status' });
    }
};

