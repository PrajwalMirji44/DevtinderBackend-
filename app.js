const express = require("express");
const mongoose = require("mongoose")
const connectDB = require("./src/config/database")
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/userRequests");
const cors = require("cors");

app.use (cors({
    origin : "http://localhost:5173",
    credentials :true,
}));
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const requestRouter = require("./src/routes/request")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)



connectDB()
    .then(() => {
        console.log("Database connected successfully");
        const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

    })
    .catch((err) => {
        console.log("Database not connected! ");
        console.log(err);
        

    });
