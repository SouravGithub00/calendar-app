// routes.js

const express = require('express');
const router = express.Router();
const { createSlot, listSlots, deleteSlot } = require('../service/slot');

// Route to create a new slot
router.post('/create', async (req, res) => {
    const { startTime, adminId, date } = req.body;

    try {
        const newSlot = await createSlot(startTime, adminId, date);
        res.status(201).json(newSlot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const slots = await listSlots(query);
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to delete a slot by its ID
router.delete('/:slotId', async (req, res) => {
    const { slotId } = req.params;

    try {
        const deletedSlot = await deleteSlot(slotId);
        res.json(deletedSlot);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
