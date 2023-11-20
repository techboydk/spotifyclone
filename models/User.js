const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
    },
    lastName: {
        type: 'string',
        required: false,
    },
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
    },
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;