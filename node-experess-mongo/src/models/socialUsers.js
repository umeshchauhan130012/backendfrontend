const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    follow: {
        type: Number,
        required: true,
        minLength: 1,
    },
    grouth: {
        type: Number,
        required: true,
        minLength: 1,
    },
    increment: {
        type: Boolean,
        default: true,
    },
    followtype: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Social = new mongoose.model("Social", socialSchema);
module.exports = Social; 