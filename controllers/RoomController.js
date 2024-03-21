"use strict";

const {isEmptyObject, appResponse} = require("./utility.js");
const service = require("../services/roomService.js");
const roomTypeService = require("../services/roomTypeService.js");
const { default: mongoose } = require("mongoose");


class Roomcontroller{
    async fetchRoom(req,res){
        try {
           const Id = req.params.roomId
           const room = await service.fetch({_id: Id});

           return appResponse(res, 201, "Room is available", room);

        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async createRoom(req,res){
        try {
            const data = {...req.body};
            const Type = roomTypeService.fetch({name: data.roomType.toLowerCase()});

            if (!Type) console.log("RoomType does not exist"); 

            if(!isEmptyObject(data)){
                data._id = new mongoose.Types.ObjectId();
                data.roomType = Type._id;
                const addRoom = await service.create(data);
                if (addRoom) return appResponse(res, 200, "Resource created successfully.", addRoom);

                appResponse(res, 300, "Create room failed");
            };
            
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomTrash(req,res){
        try {
            const Id = req.params.roomId;
            let room = await service.delete(Id);

            if (room) return appResponse(res, 200, "Entry Deleted", room);

            return appResponse(res, 300, "Item does not exist");
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomEdit(req,res){
        try {
            const data = {...req.body};
            let changes = service.edit(req.params.roomId, data);

            if (!changes) return appResponse(res, 400, "Update unsucessful, check parameters");
            return appResponse(res, 200, "Update Successful");
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }

    async roomByQuery(req,res){
        try {
            const filter = {...req.query};
            let command = {};

            if (!isEmptyObject(filter)){
                if (filter.search) command.name = filter.search;
                if (filter.roomType) command.roomType = filter.roomType;
                if ((filter.maxPrice ? filter.maxPrice: false) > (filter.minPrice ? filter.minPrice : 0 )){
                    if (filter.maxPrice) command.price = { $lt: filter.maxPrice, $gt: 0};
                    if (filter.minPrice) command.price = { $gt: filter.minPrice, $lt: filter.maxPrice};}
                
                
                // res.send('Simple');
                console.log(command);

                // console.log(filter);
                const roomResult = await service.query(command);
                console.log(roomResult);
                if(roomResult) return appResponse(res, 201, "Room is available");
                return appResponse(res, 300, "Query unsucessful");
            }
            return appResponse(res, 400, "Its from the user" + filter);

        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 401, errorMessage);
        }
    }
}

module.exports = Roomcontroller;