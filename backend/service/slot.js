// slotService.js

const Slot = require('../models/slot'); 

async function createSlot(startTime, adminId, date) {
    try {
        const newSlot = new Slot({
            startTime: startTime,
            adminId: adminId,
            date: date
        });

        const savedSlot = await newSlot.save();
        return savedSlot;
    } catch (error) {
        throw new Error(`Failed to create slot: ${error.message}`);
    }
}


async function listSlots(query) {
    try {
        // Filter slots by adminId and date
        const slots = await Slot.find(query);
        return slots;
    } catch (error) {
        throw new Error(`Failed to list slots: ${error.message}`);
    }
}


async function deleteSlot(slotId) {
    try {
        const deletedSlot = await Slot.findByIdAndDelete(slotId);
        if (!deletedSlot) {
            throw new Error('Slot not found');
        }
        return deletedSlot;
    } catch (error) {
        throw new Error(`Failed to delete slot: ${error.message}`);
    }
}

module.exports = {
    createSlot,
    listSlots,
    deleteSlot
};
