"use strict";

const { appResponse } = require("../controllers/utility");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyUserToken(req,res,next){
    const token = req.headers.auth.split(' ')[0];
    // console.log(token);
    if(!token) return appResponse(res, 401, "Access Denied/ Unauthorised request");

    try {
        if (token === 'null' || !token) return appResponse(res, 400, "Unauthorised request");
        const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!verifiedUser) appResponse(res, 401, "Unauthorised request/access");

        req.user = verifiedUser; //user or addUser, elect
        next();
    } catch (error) {
        return appResponse(res, 400, error.message);
    }
}


module.exports = verifyUserToken;