" use strict ";

const {model, Schema, default:mongoose} = require("mongoose");

const User = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    chosen : {
        type: Boolean,
        require: true,
    },
});

module.exports = new model("User", User);