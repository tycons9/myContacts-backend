const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: String,
        required: [true, "Please add contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add contact email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please add contact phone"],
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
