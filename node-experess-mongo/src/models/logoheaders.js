const mongoose = require("mongoose");

const logoheaderSchema = new mongoose.Schema({
    logolink: {
        type: String,
    },
    title: {
        type: String,
    },
    logohead: {
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

const LogoHeader = new mongoose.model("LogoHeader", logoheaderSchema);
module.exports = LogoHeader; 