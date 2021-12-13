import db from '../models/index.js'

// create main Model

export const User = db.users


// Main Work

// 1. Create User

export const createUser = async (req, res) =>{

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

export const getAllUsers = async(req, res) =>{
    let users = await User.findAll({})
    res.status(200).send(users);
}


// 3. Get Single User

export const getSingleUser = async(req, res) =>{

    let id = req.params.id

    let user = await User.findOne({ where: {id:id}})
    res.status(200).send(user);
}


// 4. Update User

export const updateUser = async(req, res) =>{

    let id = req.params.id

    const user = await User.update(req.body, {where:{id:id}})

    res.status(200).send(user);
}


// 5. Delete User

export const deleteUser = async(req, res) =>{

    let id = req.params.id

    let user = await User.destroy({ where: {id:id}})
    res.status(200).send("User Deleted Successfully!");
}


export const loginUser = async(req, res) =>{

    let email = req.body.email
    let password = req.body.password


    let user = await User.findOne({ where: {
        email:email,
        password:password 
        }
    });
    res.status(200).send(user);

}


