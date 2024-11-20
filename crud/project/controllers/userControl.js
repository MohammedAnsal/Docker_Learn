//  import module (Model) 
const User = require('../models/userModel');

//  securely hash passwords :-
// const bcrypt = require('bcrypt');

// const securePassword = async (password) => {
    
//     try {

//         const passwordhash = await bcrypt.hash(password, 10);
//         return passwordhash;
        
//     } catch (error) {

//         console.log(error.message);
        
//     }
// };

//===============================//


//  User SignUp Method :-  (Get of Signup)

const loadSign = async (req, res) => {

    if (req.session.user_id) {

        res.redirect('/home');
    
    } else if (req.session.admin_id) {      //  Admin session handle
        
        res.redirect('/admin/home');

    } else {
       
        try {
        
            const emailexistsError = req.flash('emailError');
            res.render("signup" , {emailExists : emailexistsError});
           
        } catch (error) {
           
           console.log(error.message);
           
        }
    
    }
    
};


//  Fetch User data and store data in (DataBase) :- (Post of Signup)

const insertUser = async (req, res) => {
    
    try {

        //  Same email vechu kerumbo ulla checking :-
        
        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            
            req.flash('emailError', 'Email already exists');
            return res.redirect('/signup');

        }

        // const spassword = await securePassword(req.body.password);

        const user = new User({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            is_admin: 0,

        });

        const userData = await user.save();
        
        if (userData) {

            // req.session.user = userData;    // (add user data in the session)

            req.flash("success", "Signup Successfull");

            res.redirect('/login');


        } else {

            res.render('signup', { message: "Your sign up has been failed" });

        }
        
    } catch (error) {

        console.log(error.message);
        
    }
};

//===============================//



//  User Login Method :- (Login Get)        //  Session Handling Placee

const loadLogin = async (req, res) => {
          
    if (req.session.user_id) {

        res.redirect('/home');
    
    } else if (req.session.admin_id) {       //  Admin session handle
        
        res.redirect('/admin/home');

    }else {
       
        try {

            const signupSuccess = req.flash('success');     //  Signup Success (Flash)
            const passwordWorng = req.flash("passError");   //  Password Error (Flash)
            const logout = req.flash("logout");             //  Logout (Flash)

            res.render("login", { successSignup: signupSuccess  , passWorng : passwordWorng , logoutMsg : logout });     // Set All flash
            
        } catch (error) {

            console.log(error.message);
            
        }
    
    }
    

};


//  Find User data and checking alsoo:- (Login Post)

const verifyLogin = async (req, res) => {

    const Email = req.body.email;
    const Password = req.body.password;

    try {

        const userDataa = await User.findOne({ email: Email });

        if (userDataa && ( userDataa.is_admin == 0 )) {
            
            // const passMatch = await bcrypt.compare(Password, userDataa.password);

            if(Password) {

                req.session.user_id = userDataa._id; //  Add User Data in the dbs to session

                res.redirect("/home");

            } else {

                req.flash('passError', 'Password is Wrong');      //  Password Wrong (Flash)

                res.redirect('/login');

            } 

        } else {

            res.render('login', { userDosentMag: "User Dosen't Exist" });

        }

    } catch (error) {

        console.log(error.message);
        
    }
};

//===============================//


//  Home Page Method :- (Home Get)

const lodaHome = async (req, res) => {

    if (req.session.user_id) {
        
        try {

            const userName = await User.findOne({ _id: req.session.user_id});

            if (userName.is_admin === 0) {                  //  Admin not access in user login page
                
                res.render("home", { user: userName });

            } else {
                
                res.redirect('/login');
            }
 
        } catch (error) {

            console.log(error.message); 
            
        }

    } else {

        res.redirect('/login');

    }
};

//===============================//



//  LogOut Session :- (LogOut Post)

const logout = async (req, res) => {
    
    try {

        req.session.user_id = undefined;
        req.flash('logout', "Logout Successfully");
        res.redirect('/login');
 
    } catch (error) {

        console.log(error.message);
        
    }
};

//===============================//


//  Export all modules  //

module.exports = {

    loadSign,
    insertUser,
    loadLogin,
    verifyLogin,
    lodaHome,
    logout

};