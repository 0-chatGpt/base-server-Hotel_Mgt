const room = require("../models/roomModel.js");
const roomType = require("../models/roomTypeModel.js");
const mongoose = require("mongoose");
const {isEmpty, appResponse} = require("./utility.js");




class Controller {
    async getAllRoomTypes (req, res){
        try {
            const room_types = await roomType.find().exec();
            res.json(room_types);
        } catch (err) {
            const errorMessage = error.message;
            return appResponse(res, 300, errorMessage)
        }
    }
    async createRoomType (req, res){
        let addType = req.body;
        if(!addType.name) return appResponse(res, 400, "invalid name");
        addType._id = new mongoose.Types.ObjectId();

        const addRoomType = new roomType(addType);
        if(!addRoomType) return appResponse(res, 400, "We could not complete request. Try again later.");
        
        await addRoomType.save();
        
        return appResponse(res, 200, "Resource created successfully." + addRoomType);
    }
    async createSomeRoom (req, res){
        let _type = req.body;
        const addRoomType = new roomType({"_id": new mongoose.Types.ObjectId(), "name": "bungalow" });
        await addRoomType.save();
        _type._id = new mongoose.Types.ObjectId();
        _type.roomType = addRoomType._id;
        const addRoom = new room(_type);
        await addRoom.save()
        if (addRoom) appResponse(res, 200, "Resource created successfully.");
    }
    async roomSelector (req, res){
        try {
            const _room = await room.findById(req.params.roomId).exec();
            console.log(_room);
            return appResponse(res, 201, "Room is available"+_room);
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 300, errorMessage);            
        }
    }

    async roomEdit (req, res){
        //
        try {
            const cache = await room.findById(req.params.roomId);
            const edits = req.body;
            // console.log(typeof edits.key);
            Object.keys(edits).forEach(element => {
                console.log(cache.hasOwnProperty(element));
                cache[`${element}`] = edits[`${element}`];
            });
            console.log(cache);
            const edit = await cache.save();
        //     // console.log(cache);
            if (!edit) return appResponse(res, 400, "Update unsucessful, check parameters");
            return appResponse(res, 200, "Update Successful");
        } catch (error) {            
            const errorMessage = error.message;
            return appResponse(res, 300, errorMessage);   
        }
    }
    async roomTrash (req, res){
        try {
            const cache = await room.findByIdAndDelete(req.params.roomId);
            if (cache) return appResponse(res, 200, "Entry Deleted");
        } catch (error) {            
            const errorMessage = error.message;
            return appResponse(res, 300, errorMessage);   
        }
    }

    async roomSelectorQuery (req, res){
        try {
            const filter = req.query;
            let command = {};
            console.log(filter);
            if (!isEmpty(filter)){
                if (filter.search) command.name = filter.search;
                if (filter.roomType) command.roomType = filter.roomType;
                if ((filter.maxPrice ? filter.maxPrice: false) > (filter.minPrice ? filter.minPrice : 0 )){
                    if (filter.maxPrice) command.price = { $lt: filter.maxPrice, $gt: 0};
                    if (filter.minPrice) command.price = { $gt: filter.minPrice, $lt: filter.maxPrice};}
                
                
                // res.send('Simple');
                console.log(command);

                // console.log(filter);
                const roomResult = await room.find(command);
                console.log(roomResult);
                if(roomResult) return appResponse(res, 201, "Room is available");
                return appResponse(res, 300, "Query unsucessful");
            }
         return appResponse(res, 400, "Its from the user" + filter)
        } catch (error) {
            const errorMessage = error.message;
            return appResponse(res, 300, errorMessage);           
            // console.dir(Object.getOwnPropertyNames(error)); 
        }
    }
}

module.exports = Controller;