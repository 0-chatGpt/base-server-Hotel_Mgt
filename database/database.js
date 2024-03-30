"use strict";

const mongoose = require("mongoose");
// const cors = require("cors");

async function db(remote=true){
    try {
        // console.log(`${process.env.DATABASE_URL}`);
        const conn = remote ? await mongoose.connect(`${process.env.DATABASE_URL}`) : await mongoose.connect(`${process.env.DATABASE_URL_LOCAL}`, {family:4});
        console.log(`Database connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports =  db;