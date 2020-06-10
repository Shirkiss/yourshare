const mongoose = require('mongoose');

const Followers = mongoose.model('Followers', new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    followingUserId: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
}));

exports.Followers = Followers;