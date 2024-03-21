"use strict";

const {isEmptyObject, appResponse} = require("./utility.js");
const service = require("../services/roomTypeService.js");
const { default: mongoose } = require("mongoose");

// console.log(isEmptyObject);

class RoomTypeController{
    async AllRoomTypes(req,res){
        try {
            const data = await service.fetchAll();
            if (!data) return appResponse(res, 300,  "No records");
            return appResponse(res, 201, "Fetched Data success", data);
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async createRoomType(req,res){
        try {
            const data = {...req.body};
            if (!isEmptyObject(data)){
                if(data.hasOwnProperty("_id")){ data._id ? data._id : data._id = new mongoose.Types.ObjectId();}else{
                    data._id = new mongoose.Types.ObjectId();
                }
                const existing = await service.fetch({name: data.name});

                if (!existing) return appResponse(res, 403, "Room Type already exists");
                

                const addRoomType = await service.create(data);
                return appResponse(res, 201, "RoomType created Successfully", addRoomType);
            }

            return appResponse(res, 300, "data is empty", data);
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }
}


module.exports = RoomTypeController;