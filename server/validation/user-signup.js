const { z } = require("zod");


const userSchemaValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max({ message: "Email must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(10, { message: "Phone must be at least of 10 characters" }),
    state: z
        .string({ required_error: "State is required" })
        .trim(),
    referCode: z
        .string({ required_error: "Refer code is required is required" })
        .trim()
        .min(6, { message: "Refer code  must be at least of 6 characters" })
        .max(6, { message: "Refer code  must be at least of 6 characters" }),
    pinCode: z
        .string({ required_error: "Pin code required is required" })
        .trim()
        .min(6, { message: "Pin code must be at least of 6 characters" })
        .max(6, { message: "Pin code must be at least of 6 characters" }),


});

module.exports = userSchemaValidation;