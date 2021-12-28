const db = require('../models/index.js');
var datetime = require('node-datetime');
// create main Model

 const User = db.users
 const ForgetPassword = db.forgetPasswords;

// Main Work

// 1. Create User

 const createUser = async (req, res) =>{

    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.first_name,
        profile_picture: null,
        email: req.body.email,
        password: req.body.password,
        user_type: 1,
        status: 1
    }

    const user = await User.create(data)
    res.status(201).send(user);

}

// 2. Get All Users

 const getAllUsers = async(req, res) =>{
    let users = await User.findAll({})
    res.status(200).send(users);
}


// 3. Get Single User

 const getSingleUser = async(req, res) =>{

    let id = req.params.id

    let user = await User.findOne({ where: {id:id}})
    res.status(200).send(user);
}


// 4. Update User

 const updateUser = async(req, res) =>{

    let id = req.params.id

    const user = await User.update(req.body, {where:{id:id}})

    res.status(200).send(user);
}


// 5. Delete User

 const deleteUser = async(req, res) =>{

    let id = req.params.id

    let user = await User.destroy({ where: {id:id}})
    res.status(200).send("User Deleted Successfully!");
}


 const loginUser = async(req, res) =>{

    let email = req.body.email
    let password = req.body.password


    let user = await User.findOne({ where: {
        email:email,
        password:password 
        }
    });
    res.status(200).send(user);

}


const sendOTP = async(req, res) =>{

    var dt = datetime.create();
    let data = {
        email: req.body.email,
        token: Math.floor(Math.random() * 10000),
        expire: dt.format('Y-m-d H:M:S')

    }
    var email = req.body.email;
    let user = await User.findOne({ where: {email:email}});

    if(user){

        const forgetPassword = await ForgetPassword.create(data);

        if(forgetPassword){
            let results = {
                status : true,
                message: 'OTP created sucessfully.',
                email : email
            }
            res.status(201).send(results);
        }else{
            let results = {
                status : false,
                message: 'Something went wrong.',
                email : email
            }
            res.status(201).send(results);
        }
    

    }else{
        let results = {
            status : false,
            message: 'Email not found.',
            email : email
        }
        res.status(404).send(results);
    }


   
}

const checkOTP = async(req, res) =>{

    let email = req.body.email
    let token = req.body.token

    const forgetPassword = await ForgetPassword.findOne({ where: {
        email:email,
        token:token 
        }
    });


    if(forgetPassword){
        let results = {
            status : true,
            message: 'OTP authenticated successfully.',
            email : email
        }
        res.status(200).send(results);
    }else{
        let results = {
            status : false,
            message: 'OTP authenticate failed.',
            email : email
        }
        res.status(404).send(results);
    }

}

const resetPassword = async( req, res) =>{

    let email = req.body.email
    let token = req.body.token
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword

    if(password != confirmPassword){
        let results = {
            status : false,
            message: 'Confirm password does not match',
            email : email
        }
        res.status(400).send(results);
    }

    
    const forgetPassword = await ForgetPassword.findOne({ where: {
        email:email,
        token:token 
        }
    });


    if(forgetPassword){


        let data = {

            email:email,
            password:password,

        }

        const user = await User.update(data, {where:{email:email}})

        if(user){

            let fp = await ForgetPassword.destroy({ where: {id:forgetPassword.id}});

            let results = {
                status : true,
                message: 'Password reset successfully.',
                email : email
            }

            res.status(200).send(results);


        }else{

            let results = {
                status : false,
                message: 'Password reset failed.',
                email : email
            }

            res.status(200).send(results);

        }

       
    }else{
        let results = {
            status : false,
            message: 'OTP authenticate failed.',
            email : email
        }
        res.status(404).send(results);
    }

}


module.exports = { 
    createUser, 
    getAllUsers, 
    getSingleUser,  
    updateUser, 
    deleteUser, 
    loginUser, 
    sendOTP, 
    checkOTP, 
    resetPassword  }