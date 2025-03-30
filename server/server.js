// Requires
require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require("./configs/db-config");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const cloudinaryConnect = require("./configs/cloudinary-config");
const fileUpload = require("express-fileupload");

//1. for deployment purpose (require path)
const path = require("path");
//2. for deployment purpose (take path)
const _dirname = path.resolve();
// console.log("path", _dirname)

// cloudinary connect
cloudinaryConnect()

// TODO: tackle cors

const corsOption = {
    // origin: "https://sudhnil.onrender.com",
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// file upload
const fileUploadOption = {
    useTempFiles: true,
    tempFileDir: "/tmp",
}


// middleware
app.use(express.json());
app.use(cors(corsOption))
app.use(fileUpload(fileUploadOption))


// Router Path
const userRouter = require("./routers/user-router");
const businessRouter = require("./routers/business-router");


// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/business", businessRouter);



// 3. for deployment purpose
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
});


app.use(errorMiddleware)

// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});