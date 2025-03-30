const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const otpModel = require("../models/otp-model")





// TODO: ------------------------ User Send Otp Page Logic -----------------------------------------------------
const sendOtp = async (req, resp) => {
    try {
        const { email } = req.body;

        // checking user is register or not
        const alreadyRegister = await userModel.findOne({ email: email });

        // ---------------------------------- if not -------------------------------
        if (!alreadyRegister) {
            return resp.status(400).json({
                success: false,
                message: "User is not registered",
            })
        }

        //------------------------------- else ---------------------------------------

        // generating otp
        let generateOtp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });


        // check otp is unique or not
        const checkOtp = await otpModel.findOne({ otp: generateOtp });

        // if not unique
        while (checkOtp) {
            generateOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            checkOtp = await otpModel.findOne({ otp: generateOtp })
        }

        // getting unique otp 
        const otpPayload = { email, otp: generateOtp };

        //create an entry for otp in db
        const otpBody = await otpModel.create(otpPayload);


        resp.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            response: otpBody
        })

    } catch (error) {
        // console.log("Error Occurs while sending otp: ", error);
        resp.status(200).json({
            success: false,
            message: "Error Occurs while sending otp",
            error: error.message,
        })
    }
}



// TODO: ------------------------ User Register Page Logic -----------------------------------------------------

const register = async (req, resp) => {
    try {
        const { name, email, phone, pinCode, state, referCode } = req.body;


        // if email or phone already exits
        const userExist = await userModel.findOne({ email: email });


        // if (userExist return true and false)
        if (userExist) {
            return resp.status(400).json({ success: false, message: "User Already Register" });
        }


        //else
        const userCreated = await userModel.create({
            name, email, phone, pinCode, state, referCode
        });

        resp.status(200).json({
            success: true,
            message: "Register Successfully",
            response: userCreated,
        })

    } catch (error) {
        // console.log("Error Occurs while singUp: ", error);
        resp.status(200).json({
            success: false,
            message: "Error Occurs while signup",
            error: error.message,
        })
    }
}


// TODO: -------------------------------------- User Login Page Logic -------------------------------------------

const login = async (req, resp) => {
    try {

        const { email, otp } = req.body;
        // console.log("email,otp", email + otp);

        if (!email || !otp) {
            return resp.status(400).json({
                success: false, message: "Please fill the form properly"
            })
        }

        const userDetails = await userModel.findOne({ email: email });


        // --------------------------- matching opt --------------------------------------------
        const recentOtp = await otpModel.findOne({ email: email }).sort({ createdAt: -1 });


        // if otp not found and matched 
        if (recentOtp === null) {
            return resp.status(404).json({
                success: false,
                message: "Invalid otp"  // in otp collection no otp found with this email
            })
        } else if (otp != recentOtp.otp) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Otp"
            })
        }

        // ------------------------------------ if otp matched -------------------------------

        // generate JWT
        const payload = {
            email: userDetails.email,
            id: userDetails._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "5h",  // 5 hours
        })

        resp.status(200).json({
            success: true,
            message: "User Login Successfully",
            token: token,
            response: userDetails,

        });

    } catch (error) {
        // console.log("Error Occurs while login: ", error);
        resp.status(200).json({
            success: false,
            message: "Error Occurs while login",
            error: error.message,
        })
    }
}


// TODO: ----------------------------------------- getting details of user ------------------------------------

const userDetails = async (req, resp) => {
    try {

        const userData = req.user;
        const userId = userData.id;
        const userDetails = await userModel.findOne({ _id: userId })

        resp.status(200).json({ success: true, response: userDetails });



    } catch (error) {
        resp.status(200).json({
            success: false,
            message: "Error occurs while getting details of logged user",
            error: error.message,
        })
    }
}


module.exports = { register, login, sendOtp, userDetails };