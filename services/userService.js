"use strict";

const model = require("../models/userModel.js");

class UserService{
    async create(data){
        return await model.create(data);
    }

    async fetch(pred){
        return await model.find(pred);
    }
}; 

module.exports = new UserService();