"use strict";

const room = require("../models/roomModel.js");

class Room {
    async create(roomData){
        return await room.create(roomData);
    }

    async fetch(pred){
        return await room.find(pred);
    }

    async edit(Id, roomData){
        const cache = [...await this.fetch({_id: Id})][0];

        if (cache){
            Object.keys(roomData).forEach(element => {
                // console.log(Object.hasOwn(cache, element));
                // if(cache.hasOwnProperty(element)) 
                cache[`${element}`] = roomData[`${element}`];
            });
        }
        console.log(cache);

        return await cache.save();

    }

    async delete(Id){
        return await room.findByIdAndDelete(Id, {lean: true});
    }

    async query(pred){
        return await room.find(pred);
    }
}

module.exports = new Room();