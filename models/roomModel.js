"use strict";

const {model, Schema, default:mongoose} = require("mongoose");


const RoomSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    roomType: {
        type: Schema.Types.ObjectId,
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