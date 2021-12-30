const createUser = require('../controllers/user-controller.js').createUser;
const getAllUsers = require('../controllers/user-controller.js').getAllUsers;
const getSingleUser = require('../controllers/user-controller.js').getSingleUser;
const updateUser = require('../controllers/user-controller.js').updateUser;
const deleteUser = require('../controllers/user-controller.js').deleteUser;
const loginUser = require('../controllers/user-controller.js').loginUser;
const sendOTP = require('../controllers/user-controller').sendOTP;
const checkOTP = require('../controllers/user-controller').checkOTP;
const resetPassword = require('../controllers/user-controller').resetPassword;

const auth = require('../middlewares/auth')

const route = require('express');
const routes = route.Router();

routes.post('/create-user',createUser)
routes.get('/get-all-users',getAllUsers)
routes.get('/get-single-user:id',getSingleUser)
routes.put('/update-user:id', updateUser)
routes.delete('/delete-user:id',deleteUser)

routes.post('/login-check',loginUser)

routes.post('/send-otp', sendOTP )
routes.post('/check-otp', checkOTP )
routes.post('/reset-password', resetPassword )


routes.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

// export default routes;

module.exports = routes;