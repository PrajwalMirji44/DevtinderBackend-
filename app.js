const express = require("express");
const connectDB = require("./src/config/database")
const app = express();
const User = require("./src/Models/user")


app.post("/signUp",async (req,res)=>{
    //creating a new instance of the User Model 
    const user = new User({
        firstName : "Rahul",
        lastName : "Nimbi",
        emailId : "Rahul@example.com",
        password : "abc@123"
    });
    try{
        await user.save();
    res.send("user added successfully!")
    }catch{
        res.status(400).send("error is saving!")
    }
    
})

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");

        })

    })
    .catch((err) => {
        console.log("Database not connected! ");

    });
