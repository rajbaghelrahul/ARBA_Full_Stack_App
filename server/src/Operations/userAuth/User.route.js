
const express = require("express");
const router = express.Router();
const {  LoginController, RegisterController, UpdatePasswordController, ProfileUpdateController } = require('./User.controller')

const tokenverify=require("../../Middleware/Authentication.Middleware")
router.post('/register', RegisterController)

router.post('/login', LoginController)

router.use(tokenverify);

router.patch('/updatepassword', UpdatePasswordController)

router.patch('/profileupdate', ProfileUpdateController)

module.exports = router;