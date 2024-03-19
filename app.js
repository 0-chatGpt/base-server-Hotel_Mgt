"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {Controller, appResponse} = require("./controllers/controller.js");
const db = require("./database/database.js");
const cors = require("cors");
mongoose.set('strictQuery', false);

const app = express();
// // Using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// // Mongodb connect
db(!true);
const controller = new Controller();


// /** client get request  */

app.get(`/`, (req, res) => {
    res.send(`<h1>Hello World</h1>`)
});


app.get(`/api/v1/rooms-types`, controller.getAllRoomTypes);

app.get(`/api/v1/rooms`,controller.roomSelectorQuery);

app.get(`/api/v1/rooms/:roomId`,controller.roomSelector);


// /** end  */

// /** client post request  */


app.post(`/api/v1/rooms-types`, controller.createRoomType);

app.post(`/api/v1/rooms`,controller.createSomeRoom);


// /** end  */

// /** Other methods */

app.patch(`/api/v1/rooms/:roomId`, controller.roomEdit);

app.delete(`/api/v1/rooms/:roomId`, controller.roomTrash);

// /** end */

app.listen(process.env.PORT, ()=>{
    console.log(`app listening on port ${process.env.PORT}`);
});



