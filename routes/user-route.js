const createUser = require('../controllers/user-controller.js').createUser;
const getAllUsers = require('../controllers/user-controller.js').getAllUsers;
const getSingleUser = require('../controllers/user-controller.js').getSingleUser;
const updateUser = require('../controllers/user-controller.js').updateUser;
const deleteUser = require('../controllers/user-controller.js').deleteUser;
const loginUser = require('../controllers/user-controller.js').loginUser;
const route = require('express');

const routes = route.Router();

routes.post('/create-user',createUser)
routes.get('/get-all-users',getAllUsers)
routes.get('/get-single-user:id',getSingleUser)
routes.put('/update-user:id', updateUser)
routes.delete('/delete-user:id',deleteUser)

routes.post('/login-check',loginUser)

// export default routes;

module.exports = routes;