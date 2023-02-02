const express = require("express");
const { registerUser, authUser, authAdmin, sendData } = require("../constrollers/userControllers");

const router = express.Router();

// router.route('/register').post(registerUser)
router.post('/register', registerUser)
router.post('/admin_login', authAdmin)
router.post('/user_login', authUser)
router.get('/:id', sendData)
module.exports = router;
//http://localhost:5000/api/user/user_l/63db8034b729c15ce4f8ce05