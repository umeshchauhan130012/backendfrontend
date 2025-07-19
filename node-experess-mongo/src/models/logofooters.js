const mongoose = require("mongoose");

const logofooterSchema = new mongoose.Schema({
    logolink: {
        type: String,
    },
    title: {
        type: String,
    },
    logofoot: {
        filename: String,
        path: String,
        size: Number,
        mimetype: String
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})

const LogoFooter = new mongoose.model("LogoFooter", logofooterSchema);
module.exports = LogoFooter; 