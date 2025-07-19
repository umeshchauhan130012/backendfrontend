const mongoose = require("mongoose");

const networkmenuSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    linktype: { type: Boolean, default: true },
    order: { type: Number },
    date: {type: Date,default: Date.now}
})

const networkmenu = new mongoose.model("networkmenu", networkmenuSchema);
module.exports = networkmenu; 