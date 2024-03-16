"use strict";

const {model, Schema, default:mongoose} = require("mongoose");


const RoomSchema = new Schema({
    _id: Schema.ObjectId,
    name: {
        type: String,
        required: true,
    },
    roomType: {
        type: Schema.ObjectId,
        ref: "RoomType",
    },
    price: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
});


module.exports = model("room", RoomSchema);