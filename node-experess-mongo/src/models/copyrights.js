const mongoose = require("mongoose");

const copyrightSchema = new mongoose.Schema({
    copy: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Copyright = new mongoose.model("Copyright", copyrightSchema);
module.exports = Copyright; 