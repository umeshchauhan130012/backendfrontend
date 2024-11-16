const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    catname: {
        type: String,
        required: true,
        minLength: 3,
    },
    catslug: {
        type: String,
        required: true,
        minLength: 3,
    },
    catstatus: {
        type: String,
        required: true,
    },
    catathome: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category; 