"use strict";

require("dotenv").config();
const express = require("express");
const db = require("./database/database.js");
const cors = require("cors");
const indexRoute = require("./routes/indexRoute.js");

const app = express();
// // Using middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// // Mongodb connect
db();



app.use(`/api/v1`, indexRoute);



app.listen(process.env.PORT, ()=>{
    console.log(`app listening on port ${process.env.PORT}`);
});



