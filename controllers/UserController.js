"use strict";


require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const service = require("../services/userService.js");
const {isEmptyObject, appResponse} = require("./utility.js");


class UserController{
    async register(req, res){
        try {
            const data = {...req.body};
            if (!isEmptyObject(data)){
                const salt = await bcrypt.genSalt(10);
                const hasPassword = await bcrypt.hash(req.body.password, salt);
                data.password = hasPassword;
                data.chosen = data.chosen ? data.chosen : false;
                const addUser = await service.create(data);
                if(!addUser) return appResponse(res, 300, "Resource creation failed");
                let payload = {id: addUser._id, chosen: data.chosen || 0};
                const token = jwt.sign(payload, process.env.TOKEN_SECRET);
                return appResponse(res, 200, `Token: ${token}`, addUser, token);
            }
            throw new Error("request body is empty");
        } catch (error) {
            return appResponse(res, 432, error.message);
        }
    }

    async fetchByLogin(req, res){
        try {
            const data = {...req.body};
            if (!isEmptyObject(data)){
                const user = await service.fetch({$or:[{name:data.name}, {email:data.email}]});
                if (user[0]){
                    const validPass = await bcrypt.compare(data.password, user[0].password);
                    if(!validPass) return appResponse(res, 401, "Name/Email or Password is wrong");

                    let payload = {id: user[0]._id, chosen: user[0].chosen || 0};
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
                    res.header("auth", token);
                    return appResponse(res, 200, `Token: ${token}`, user);
                }
                return appResponse(res, 401, "invalid enquiry");
            }
            throw new Error("request body is empty");
        } catch (error) {
            return appResponse(res, 302, error.message);
        }
    }
}

module.exports = UserController;