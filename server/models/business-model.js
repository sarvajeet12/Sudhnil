const mongoose = require("mongoose");



const businessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    aadharNo: {
        type: String,
        required: true
    },
    gstNo: {
        type: String,
        required: true,
    },
    panNo: {
        type: String,
        required: true
    },
    frontImageAadhar: {
        type: String,
        required: true
    },
    backImageAadhar: {
        type: String,
        required: true
    },
    panCardImage: {
        type: String,
        required: true
    },


});




// define the model or the collection name
const Business = new mongoose.model("business", businessSchema);

module.exports = Business;