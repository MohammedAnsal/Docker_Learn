//  import module (Model)
const User = require("../models/userModel");

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

//  Admin Login Method :-  (Get)

const loadAdmin = async (req, res) => {

    if (req.session.admin_id) {

        res.redirect('/admin/home');

    } else {

        try {

            const logoutad = req.flash("Logout");
            res.render("admin/login" , {logoutAdmin : logoutad});  
            
        } catch (error) {

            console.log(error.message);
            
        }

    }
    
};

//===============================//

//  Admin verify method :- (Post)

const loadVerify = async (req, res) => {
    
    try {

        const Email = req.body.email;
        const Password = req.body.password;

        const adminData = await User.findOne({ email: Email });

        if (adminData) {
            
            // const matchPasword = await bcrypt.compare(Password, adminData.password);

            if (Password) {
                
                if (adminData.is_admin === 0) {
                    
                    res.render("admin/login", { errorMsg: "Unauthorized User!!!" });

                } else {

                    req.session.admin_id = adminData._id;
                    res.redirect('/admin/home');

                }

            } else {

                res.render("admin/login", { errorMsg: "Wrong Password!!!" });

            }

        } else {

            res.render("admin/login", { errorMsg: "Unauthorized User!!!" });

        }

    } catch (error) {

        console.log(error.message);
        
    }

}

//===============================//

//  Admin Home Section :- (Get)

const loadHome = async (req, res) => {
    
    if (req.session.admin_id) {
       
        try {

            //  Admin Home Search Section :-

            var search = ''

            if (req.query.search) {
                
                search = req.query.search

            };

            const adduserMag = req.flash("adduserSuccess");     // Adduser success mag (Flash)
            const emailexists = req.flash("emailExists");       //  Email Exists mag (Flash)
            const editsuccess = req.flash("edituserSuccess");    //  Edituser success msg (Flash)
            const deletesuccess = req.flash("deleteSuccess");      // Delete user success msg (Flash)
            
            const usersData = await User.find({          //  Fetch Data In Dbs to (Pass ejs file)

                is_admin: 0,

                $or: [
                    
                    {firstname : {$regex: '.*' + search + '.*' , $options : 'i'}},
                    {lastname : {$regex: '.*' + search + '.*' , $options : 'i'}},
                    {email : {$regex: '.*' + search + '.*' , $options : 'i'}}

                ]

            });

            res.render("admin/home", {

                users: usersData,
                adduserMsg: adduserMag,
                emailExists: emailexists,
                editusersuccess: editsuccess,
                deleteSuccess: deletesuccess

            });

        } catch (error) {
            
            console.log(error.message);

        }

    } else {

        res.redirect('/admin/login');

    }

};

//  Admin Logout Section :- (Post)

const loadLogout = async (req, res) => {
    
    try {

        req.session.admin_id = undefined;
        req.flash("Logout", "Logout Successfully");
        res.redirect("/admin");
        
    } catch (error) {

        console.log(error.message);
        
    }
    
};

//  Admin Add-User Section :- (Get)

const loadnewUser = async (req, res) => {
    
    if (req.session.admin_id) {
        
        try {

            res.render('admin/adduser');
        
        } catch (error) {

            console.log(error.message);
        
        }

    } else {

        res.redirect('/admin/login');
        
    }

};

//  Admin Add-User Section :- (Post)

const userVerify = async (req, res) => {
    
    try {

        //  Same email vechu kerumbo ulla checking :-
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            
            req.flash('emailExists', 'Email Already Exists');
            return res.redirect("/admin/home");

        }

        // const spassword = await securePassword(req.body.password);
        const newUser = new User({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            is_admin: 0
            
        });

        const addnewUser = await newUser.save();

        if (addnewUser) {
            
            req.flash('edituserSuccess', "Successfully...");
            res.redirect('/admin/home');

        } else {

            res.render('admin/adduser' , {message : "Somthing Wrong"});

        }
        
    } catch (error) {

        console.log(error.message);
        
    }

}

//  Edit User Section :- (Get)

const loadEdit = async (req, res) => {
    
    if (req.session.admin_id) {
       
         try {

            const id = req.query.id;
            const editDataa = await User.findById({ _id: id });
        
           if (editDataa) {
            
               res.render("admin/edituser", { user: editDataa });
            
            } else {

               res.redirect('/admin/home');

            }

        } catch (error) {

          console.log(error.message);
        
        }

    } else {

        res.redirect('/admin/login');

    }

};

//  Edit User Section :- (Post)

const verifyEdit = async (req, res) => {

    const fsname = req.body.firstname;
    const lsname = req.body.lastname;
    const Email = req.body.email

    try {

        const EditUser = await User.findByIdAndUpdate({ _id : req.body.id }, { $set: { firstname: fsname , lastname : lsname , email : Email} });
                 
        if (EditUser) {

            req.flash("editSuccess", "Edit User Succesfully");
            res.redirect('/admin/home');

        }
        
    } catch (error) {

        console.log(error.message);
        
    }

}

//  Admin Delete User Section :- (Get)

const loadDelete = async (req, res) => {
    
    try {

        const id = req.query.id;
        const deleteuUer = await User.deleteOne({ _id: id });

        if (deleteuUer) {

            req.flash('deleteSuccess', "Delete User Succesfully");
            res.redirect('/admin/home');

        }
        
    } catch (error) {

        console.log(error.message);
        
    }


}

module.exports = {

    loadAdmin,
    loadVerify,
    loadHome,
    loadLogout,
    loadnewUser,
    userVerify,
    loadEdit,
    verifyEdit,
    loadDelete

};
