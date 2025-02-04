const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    authname: {
        type: String,
        required: true,
        minLength: 2,
    },
    authurl: {
        type: String,
        required: true,
    },
    authstatus: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Auth = new mongoose.model("Auth", authSchema);
module.exports = Auth; 

