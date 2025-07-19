const mongoose = require("mongoose");

const youtubeSchema = new mongoose.Schema({
    youtubelink: {
        type: String,
    },
    status: { 
        type: Boolean, 
        default: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Youtube = new mongoose.model("Youtube", youtubeSchema);
module.exports = Youtube; 