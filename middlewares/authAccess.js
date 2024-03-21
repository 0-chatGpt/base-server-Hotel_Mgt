"use strict";

const { appResponse } = require("../controllers/utility");

const IsUser = function(req, res, next){
    if(Boolean(req.user.elect) >= false){
        next();
    }else{
        return appResponse(res, 401, "Unauthorised");
    }
}


const IsAdmin = function(req, res, next){
    if(Boolean(req.user.elect) > false){
        next();
        // console.log("reached here II");
    }else{
        return appResponse(res, 401, "Unauthorised");
    }
}

module.exports = {IsAdmin, IsUser};