// routes.js

const express = require('express');
const router = express.Router();
const { createBooking, listBookings, deleteBooking } = require('../service/booking'); // Adjust path as per your project structure

// Route to create a new booking
router.post('/create', async (req, res) => {
    const { slotId, userId } = req.body;

    try {
        const newBooking = await createBooking(slotId, userId);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const bookings = await listBookings(query);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to delete a booking by its ID
router.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params;

    try {
        const deletedBooking = await deleteBooking(bookingId);
        res.json(deletedBooking);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
