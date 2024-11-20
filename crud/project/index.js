const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo:27017/user_dbs");

const express = require("express");
const app = express();

//  set nocache
const nocache = require('nocache');

//  import config Secret Code
const config = require('./config/config');

//  set session
const session = require('express-session');
app.use(session({

    secret: config.sessionSecret,
    resave: false,
    saveUninitialized:true

}));

//  set flash
const flash = require("express-flash");

//  set path
const path = require("path");

//  connect path
app.use(express.static(path.join(__dirname, "public")));

//  use nocache
app.use(nocache());

//  use flash
app.use(flash());

//  for users route
const userRoute = require("./routers/userRoute");
app.use('/', userRoute);


//  for admin route
const adminRoute = require('./routers/adminRoute');
app.use('/admin' , adminRoute);


app.listen(6006, console.log("Server is running http://localhost:6006"));