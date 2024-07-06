// routes/user.js
const express = require('express');
const router = express.Router();
const { createUser, findUserById, listUsers } = require('../service/user');

router.get('/:userId', async (req, res) => {
  const {userId} = req.params;
  try {
    const user = await findUserById(userId);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  const query = req.query;
  try {
    const users = await listUsers(query);
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/create', async (req, res) => {
  const { name, type } = req.body;

  try {
    let user = await createUser(name, type);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
