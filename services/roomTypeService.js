"use strict";

const roomType = require("../models/roomTypeModel.js");

class RoomType{
    async create(objData){
        return await roomType.create(objData);
    }

    async fetchAll(){
        return await roomType.find({});
    }
    
    async fetch(pred){
        return await roomType.find(pred);
    }
}

module.exports = new RoomType();