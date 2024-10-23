// routes/bookingRoutes.js
const express = require('express');
const {
    bookTickets,
    getAllBookings,
    getUserBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware
const router = express.Router();

// Route to book tickets
router.post('/', authMiddleware, bookTickets);
router.get('/', getAllBookings);
// Route to get user bookings
router.get('/:userId', authMiddleware, getUserBookings);

// Route to update booking status
router.put('/:id/status', authMiddleware, updateBookingStatus);

module.exports = router;
