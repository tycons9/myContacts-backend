const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter your username"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;  // <<== You missed this line
