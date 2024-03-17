"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Controller = require("./controllers/controller.js");
const db = require("./database/database.js");
const cors = require("cors");
mongoose.set('strictQuery', false);

const app = express();
const baseUrl = `http://localhost:${process.env.PORT}`

// Mongodb connect
db(!true);
const controller = new Controller();
// Using middlewares
app.use(cors);


// filters
let searchRoomMaximumPriceMatch;
let searchRoomMinimumPriceMatch;
let searchRoomNameMatch;
let searchRoomTypeNameMatch;

/** client get request  */

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
});

app.get(`${baseUrl}/api/v1/rooms-types`, controller.getAllRoomTypes);

app.get(`${baseUrl}/api/v1/rooms?search=${searchRoomNameMatch}&roomType=${searchRoomTypeNameMatch}&minPrice=${searchRoomMinimumPriceMatch}&maxPrice=${searchRoomMaximumPriceMatch}`,controller.roomSelector);

app.get(`${baseUrl}/api/v1/rooms/:roomId`,controller.roomSelector);


/** end  */

/** client post request  */


app.post(`${baseUrl}/api/v1/rooms-types`, controller.createRoomType);

app.post(`${baseUrl}/api/v1/rooms`,controller.createSomeRoom);


/** end  */

/** Other methods */

app.patch(`{${baseUrl}}/api/v1/rooms/:roomId`, controller.roomEdit);

app.delete(`{${baseUrl}}/api/v1/rooms/:roomId`, controller.roomTrash);

/** end */

app.listen(process.env.PORT, ()=>{
    console.log(`Example app listening on port ${process.env.PORT}`);
})

/**
 * function rin(){
 * 
 * }
 * 
 * const rit = function (){
 * 
 * }
 * 
 * const ad = () => {
 * 
 * }
 * 
 */

