const db = require('../models/index.js');
var datetime = require('node-datetime');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// create main Model

 const User = db.users
 const ForgetPassword = db.forgetPasswords;

// Main Work

// 1. Create User

 const createUser = async (req, res) =>{

    const salt = await bcrypt.genSalt(10);
    // Create token



    let data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.first_name,
        profile_picture: null,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        token: "",
        user_type: 1,
        status: 1
    }

    let user = await User.create(data);

    const token = jwt.sign(
        { 
            user_id: user.id, 
            email: user.email 
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

        // save user token
        user.token = token;

    

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


    let user = await User.findOne({ where: { email:email }});

    if(user){

        const validPassword = await bcrypt.compare(password, user.password);

        if(validPassword){

            const token = jwt.sign(
                { 
                    user_id: user.id, 
                    email: user.email 
                },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );



            let data ={
                message: "Login successful!",
                token: token,
                status: true
            }
            res.status(200).send(data);
        }else{

            let data ={
                message: "Email or password does not match",
                status: false
            }
            res.status(200).send(data);
                    
        
        }

        

    }else{
        let data ={
            message: "Email or password does not match",
            status: false
        }
        res.status(200).send(data);
    }
    

}


const sendOTP = async(req, res) =>{

    var dt = datetime.create();
    var token = Math.floor(Math.random() * 1000000);
    let data = {
        email: req.body.email,
        token: token ,
        expire: dt.format('Y-m-d H:M:S')

    }
    var email = req.body.email;
    let user = await User.findOne({ where: {email:email}});

    if(user){


        let forgetPasswordFind = await ForgetPassword.findOne({ where: {email:email}});
        if(forgetPasswordFind){
            let forgetPasswordDelete = await ForgetPassword.destroy({ where: {email:email}})
        }

        let forgetPassword = await ForgetPassword.create(data);

        if(forgetPassword){
            let results = {
                status : true,
                message: 'OTP created sucessfully.',
                email : email,
                token : token
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
        res.status(200).send(results);
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
        res.status(200).send(results);
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
        res.status(200).send(results);
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

            res.status(200).json(results);


        }else{

            let results = {
                status : false,
                message: 'Password reset failed.',
                email : email
            }

            res.status(200).json(results);

        }

       
    }else{
        let results = {
            status : false,
            message: 'OTP authenticate failed.',
            email : email
        }
        res.status(200).send(results);
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