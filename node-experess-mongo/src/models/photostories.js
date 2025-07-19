const mongoose = require('mongoose');

const photostorySchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    summary: {
        type: String,
    },
    pagetitle: {
        type: String,
    },
    metatitle: {
        type: String,
    },
    metakeyword: {
        type: String,
    },
    metadescription: {
        type: String,
    },
    files: [{
        filename: { type: String },
        path: { type: String },
        size: { type: Number },
        mimetype: { type: String },
        courtesy: { type: String}, 
        title: { type: String}, 
        description: { type: String}, 
    }],
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PhotoStory', photostorySchema);
