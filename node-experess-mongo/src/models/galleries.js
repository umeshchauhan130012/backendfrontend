const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    alt: {
        type: String,
    },
    title: {
        type: String,
    },
    filefirst: {
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

const Gallery = new mongoose.model("Gallery", gallerySchema);
module.exports = Gallery; 