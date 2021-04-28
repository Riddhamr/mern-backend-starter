const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    birthdate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Users", userSchema);
