const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const SlotSchema = new Schema({
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: async function(value) {
                const slot = await mongoose.models.Slot.findOne({
                    startTime: value,
                    adminId: this.adminId,
                    date: this.date
                });
                return !slot;
            },
            message: 'startTime must be unique for the same admin and date.'
        }
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(value) {
                const user = await User.findById(value);
                return user && user.type === 'admin';
            },
            message: 'adminId must reference a user with type "admin".'
        }
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Slot', SlotSchema);
