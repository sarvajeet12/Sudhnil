const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    referCode: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        default: false,
        required: true
    },
    userType: {
        type: String,
        enum: ['customer', 'provider', 'admin'], // Allowed values
        default: 'customer',
        required: true // This ensures the field is mandatory
    }

});




// define the model or the collection name
const user = new mongoose.model("User", userSchema);

module.exports = user;