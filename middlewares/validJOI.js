"use strict";

const joi = require("joi");
const { appResponse } = require("../controllers/utility");

const userSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
    elect: joi.boolean(),
})

const validateUser = function(req, res, next){
    const result = userSchema.validate(req.body, {abortEarly: false, allowUnknown:true});
    if (result.error) return appResponse(res, 422, `"invalid request data ${result.error.details.map(err => err.message)}"`);

    next();
}

module.exports = validateUser;