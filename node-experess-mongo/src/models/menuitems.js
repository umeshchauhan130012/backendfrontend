const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    linktype: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
    order: { type: Number },
    parentId: { type: Number, default: null },
    children: { type: [Object], default: [] },
    date: {type: Date,default: Date.now}
})

const menudata = new mongoose.model("menudata", menuSchema);
module.exports = menudata; 