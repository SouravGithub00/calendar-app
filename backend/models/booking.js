const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Slot = require('./slot'); // Adjust path as per your project structure

const BookingSchema = new Schema({
    slotId: {
        type: Schema.Types.ObjectId,
        ref: 'Slot', // Reference to the Slot model/schema
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model/schema
        required: true,
        validate: {
            validator: async function(value) {
                const user = await User.findById(value);
                return user && user.type === 'student';
            },
            message: 'userId must reference a user with type "student".'
        }
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

BookingSchema.pre('save', async function(next) {
    try {
        const booking = this;
        const slot = await Slot.findById(booking.slotId);

        if (!slot) {
            return next(new Error('Slot not found'));
        }

        const userBookings = await mongoose.models.Booking.find({ userId: booking.userId });

        for (let userBooking of userBookings) {
            const bookedSlot = await Slot.findById(userBooking.slotId);

            if (bookedSlot.date.getTime() === slot.date.getTime()) {
                return next(new Error('User already has a booking on this date'));
            }
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
