const businessModel = require("../models/business-model");
const Cloudinary = require("../utils/upload-image")


// ---------------------------------- register business -----------------------------------

const businessRegister = async (req, resp) => {
    try {

        const userId = req.user.id;

        const { frontImageAadhar, backImageAadhar, panCardImage } = req.files;

        if (!frontImageAadhar || !backImageAadhar || !panCardImage) {
            return resp.status(400).json({ message: "Please fill all the fields" })
        }

        if (frontImageAadhar.mimetype !== 'image/jpeg' || backImageAadhar.mimetype !== 'image/jpeg' || panCardImage.mimetype !== 'image/jpeg') {
            return resp.status(400).json({ message: "Invalid file formate" });
        }

        // doctor data add part
        const { businessName, aadharNo, gstNo, panNo } = req.body

        // Find the business by aadharNo, gstNo, or panNo
        const existingBusiness = await businessModel.findOne({
            $or: [
                { aadharNo: aadharNo },
                { gstNo: gstNo },
                { panNo: panNo },
            ],
        });

        if (existingBusiness) {
            // If a match is found, return a response
            return resp.status(409).json({
                success: false,
                message: "User is already registered with the provided details.",
            });
        }

        // image save in Cloudinary
        const frontImage = await Cloudinary(frontImageAadhar, process.env.FOLDER_NAME1, 1000, 1000);
        const backImage = await Cloudinary(backImageAadhar, process.env.FOLDER_NAME1, 1000, 1000);
        const panImage = await Cloudinary(panCardImage, process.env.FOLDER_NAME1, 1000, 1000);

        const businessRegister = await businessModel.create({
            userId,
            businessName,
            aadharNo,
            gstNo,
            panNo,
            frontImageAadhar: frontImage.secure_url,
            backImageAadhar: backImage.secure_url,
            panCardImage: panImage.secure_url,
        });


        return resp.status(200).json({
            success: true,
            message: "Registered Successfully",
            response: businessRegister
        })
    } catch (error) {
        console.log("error in register business", error)
        resp.status(500).json({
            success: false,
            message: error.message,
        })
        next(error)
    }
}



// ------------------------------ check user logged in have business account or not -------------------------------
const checkBusinessAccount = async (req, resp) => {
    try {
        const userId = req.user.id;

        // Find the business by userId
        const existingBusiness = await businessModel.findOne({ userId });

        if (existingBusiness) {
            // If a match is found, return a response
            return resp.status(200).json({
                success: true,
                check: true,
                message: "User already has a business account.",
                response: existingBusiness,
            });
        } else {
            return resp.status(200).json({
                success: true,
                check: false,
                message: "User does not have a business account.",
                response: existingBusiness,
            });
        }


    } catch (error) {
        console.log("error in check business account", error)
        resp.status(500).json({
            success: false,
            message: error.message,
        })
        next(error)

    }
}



module.exports = { businessRegister, checkBusinessAccount };