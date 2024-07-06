const User = require('../models/user');

async function createUser(name, type) {
    try {
        const newUser = new User({
            name: name,
            type: type
        });

        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}


async function listUsers(query) {
    try {
        // Filter slots by adminId and date
        const users = await User.find(query);
        return users;
    } catch (error) {
        throw new Error(`Failed to list users: ${error.message}`);
    }
}

module.exports = { createUser, listUsers };