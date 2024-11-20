const express = require('express');
const admin_route = express()

//  set body-parser
const bodyparser = require('body-parser');
admin_route.use(bodyparser.json());
admin_route.use(bodyparser.urlencoded({ extended: true }));

//  req session
const session = require("express-session");

//  req nocache
const nocache = require('nocache');

//  req flash
const flash = require("express-flash");


//  set config secret code
const config = require('../config/config');

//  set view engine
admin_route.set('view engine', 'ejs');
// admin_route.set('views', './viwes/admin');


//  set session
admin_route.use(session({

    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true

}));

//  set flash
admin_route.use(flash());

//  set nocache
admin_route.use(nocache());


//  import admin controller
const adminController = require('../controllers/adminControl');

//  admin get
admin_route.get('/', adminController.loadAdmin);

//  admin post
admin_route.post('/', adminController.loadVerify);

//  admin home get
admin_route.get('/home', adminController.loadHome);

//  admin logout post
admin_route.post('/logout', adminController.loadLogout);

//  Admin Add-User get
admin_route.get('/newuser', adminController.loadnewUser);

//  Admin  Add-User post
admin_route.post('/newuser', adminController.userVerify);

//  Admin Edit-User get
admin_route.get('/edituser', adminController.loadEdit);

//  Addmin Edit-User post
admin_route.post('/edituser', adminController.verifyEdit);

//  Admin Delete user get
admin_route.get('/deleteuser', adminController.loadDelete);

admin_route.get('*', (req, res) => {
    
    res.redirect('/admin')

});

module.exports = admin_route;