const mongoose = require("mongoose");

const dtorySchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true
    },
    subheadline: {
        type: String,
    },
    slug: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    bodytext: {
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
    filefirst: {
        filename: String,
        path: String,
        size: Number,
        mimetype: String
    },
    filesecond: {
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

const Story = new mongoose.model("Story", dtorySchema);
module.exports = Story; 