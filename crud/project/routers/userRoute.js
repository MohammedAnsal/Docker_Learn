const express = require("express");
const user_route = express();

//  set bodyparser
const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

//  set flash
// const flash = require("express-flash");
// user_route.use(flash());

//  set template
user_route.set('view engine', 'ejs');
user_route.set('views', './views/user');

//  import config Secret Code
const config = require('../config/config')

//  set session
const session = require('express-session');
user_route.use(session({

    secret: config.sessionSecret,
    resave: false,
    saveUninitialized:true

}));

//  userController
const userController = require('../controllers/userControl');

//  signup (get)
user_route.get('/signup', userController.loadSign);

//  signup data (post , fechdata)
user_route.post('/signup', userController.insertUser);

//  login (get)
user_route.get('/', userController.loadLogin);
user_route.get('/login', userController.loadLogin);

//  login fetch data
user_route.post('/login', userController.verifyLogin);


//  home page
user_route.get('/home', userController.lodaHome);


//  logout route

user_route.post('/logout', userController.logout);

//  export module
module.exports = user_route;