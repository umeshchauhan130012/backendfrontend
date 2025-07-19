const mongoose = require("mongoose");

const footermenuSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    linktype: { type: Boolean, default: true },
    order: { type: Number },
    date: {type: Date,default: Date.now}
})

const footermenudata = new mongoose.model("footermenudata", footermenuSchema);
module.exports = footermenudata; 