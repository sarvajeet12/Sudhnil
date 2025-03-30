const { z } = require("zod");


const businessSchemaValidation = z.object({
    businessName: z
        .string({ required_error: "Business name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    aadharNo: z
        .string({ required_error: "Aadhar number is required" })
        .trim()
        .min(12, { message: "Addhar number must be of 12 characters" })
        .max(12, { message: "Addhar number must be of 12 characters" }),
    gstNo: z
        .string({ required_error: "Aadhar number is required" })
        .trim()
        .min(15, { message: "GST number must be of 15 characters" })
        .max(15, { message: "GST number must be of 15 characters" }),
    panNo: z
        .string({ required_error: "Aadhar number is required" })
        .trim()
        .min(10, { message: "PAN number must be of 10 characters" })
        .max(10, { message: "PAN number must be of 10 characters" }),



});

module.exports = businessSchemaValidation;