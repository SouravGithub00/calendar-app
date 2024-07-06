
const Booking = require('../models/booking'); 

async function createBooking(slotId, userId) {
    try {
        const newBooking = new Booking({
            slotId: slotId,
            userId: userId
        });

        const savedBooking = await newBooking.save();
        return savedBooking;
    } catch (error) {
        throw new Error(`Failed to create booking: ${error.message}`);
    }
}



async function listBookings(query) {
    try {
        const bookings = await Booking.find(query);
        return bookings;
    } catch (error) {
        throw new Error(`Failed to list bookings: ${error.message}`);
    }
}

async function deleteBooking(bookingId) {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            throw new Error('Booking not found');
        }
        return deletedBooking;
    } catch (error) {
        throw new Error(`Failed to delete booking: ${error.message}`);
    }
}

module.exports = {
    createBooking,
    listBookings,
    deleteBooking
};
