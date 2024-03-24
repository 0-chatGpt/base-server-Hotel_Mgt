"use strict";

const { appResponse } = require("../controllers/utility");

const IsUser = function(req, res, next){
    if(Boolean(req.user.chosen) >= false){
        next();
    }else{
        return appResponse(res, 401, "User Unauthorised");
    }
}


const IsAdmin = function(req, res, next){
    console.log(req.user.chosen);
    if(Boolean(req.user.chosen) > false){
        next();
        // console.log("reached here II");
    }else{
        return appResponse(res, 401, "Admin Unauthorised");
    }
}

module.exports = {IsAdmin, IsUser};