"use strict";

const {model, Schema, default:mongoose} = require("mongoose");


const RoomTypeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
},{ timestamps: true, })


module.exports = new model("roomType", RoomTypeSchema);

