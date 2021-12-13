import {createUser, getAllUsers, getSingleUser, updateUser, deleteUser, loginUser  } from '../controllers/user-controller.js';

// const route = require('express').Router()

import route from 'express';

const routes = route.Router();

routes.post('/create-user',createUser)
routes.get('/get-all-users',getAllUsers)
routes.get('/get-single-user:id',getSingleUser)
routes.put('/update-user:id', updateUser)
routes.delete('/delete-user:id',deleteUser)

routes.post('/login-check',loginUser)

export default routes;

// module.exports = route;