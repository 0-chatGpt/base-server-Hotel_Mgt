const room = require("../models/roomModel.js");
const roomType = require("../models/roomTypeModel.js");
const mongoose = require("mongoose");




class Controller {
    async getAllRoomTypes (req, res){
        const roomTypes = await roomType.find();
        res.send(JSON.stringify(roomTypes));
    }
    async createRoomType (req, res){

        const _types = new roomType(req.body);
        await _types.save();
    }
    async createSomeRoom (req, res){
        return await new Promise()// DB work
    }
    async roomSelector (req, res){
        // const _room = await room.findById()
        return await new Promise()// DB work
    }
    async roomEdit (req, res){
        
        return await new Promise()// DB work
    }
    async roomTrash (req, res){
        return await new Promise()// DB work
    }
}


module.exports = Controller;