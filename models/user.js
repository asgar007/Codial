const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // to create 2 more fields createdAt and UpdatedAT
});

const User = mongoose.model('User', userSchema);
module.exports = User;