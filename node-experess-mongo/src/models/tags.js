const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tagname: {
        type: String,
        required: true,
        minLength: 2,
    },
    tagurl: {
        type: String,
        required: true,
    },
    tagstatus: {
        type: String,
        required: true,
    },
    tagsathome: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Tag = new mongoose.model("Tag", tagSchema);
module.exports = Tag; 