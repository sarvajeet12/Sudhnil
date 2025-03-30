const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user-controller")
const userValidation = require("../validation/user-signup")
const validate = require("../middlewares/validator-middleware")
const auth = require("../middlewares/auth-middleware")


// login page  
router
    .route("/send-otp").
    post(userControllers.sendOtp);

// register page  
router
    .route("/register").
    post(validate(userValidation), userControllers.register);

// login page  
router
    .route("/login").
    post(userControllers.login);

router.route("/user-details").get(auth, userControllers.userDetails)




module.exports = router; 