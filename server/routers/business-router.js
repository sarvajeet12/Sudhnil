const express = require("express");
const router = express.Router();

const businessControllers = require("../controllers/business-controller")
const auth = require("../middlewares/auth-middleware")
const businessValidation = require("../validation/business-signup");
const validate = require("../middlewares/validator-middleware")



// register page  
router
    .route("/business-register").
    post(auth, validate(businessValidation), businessControllers.businessRegister);


// register page  
router
    .route("/check-business-account").
    get(auth, businessControllers.checkBusinessAccount);




module.exports = router; 