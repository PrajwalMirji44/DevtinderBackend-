const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} =  require("../utils/validation");
const User = require("../Models/user");
const bcrypt = require("bcrypt");



authRouter.post("/signUp",async (req,res)=>{
     try{
    validateSignUpData(req);

    const {firstName,lastName,emailId,password} = req.body;

    //encrypt
    const passwordHash = await bcrypt.hash(password,10)

    //creating a new instance of the User Model 
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash
    } );
   
       const savedUser =  await user.save();
        // create JWT token
            const token = await savedUser.getJWT();
            
          // add token to the cokie and send the response back to user
            res.cookie("token",token,{
                expires:new Date(Date.now()+ 8 *3600000)
            });

    res.json({message : "user Added successfully!", data: savedUser});
    
    }catch(err){
        res.status(400).send("ERROR :" + err.message)
    }
    
});

authRouter.post("/login",async(req,res)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId:emailId})
        
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const ispasswordValid = await user.validatePassword(password);
        if(ispasswordValid){
            // create JWT token
            const token = await user.getJWT();
            
          // add token to the cokie and send the response back to user
            res.cookie("token",token,{
                expires:new Date(Date.now()+ 8 *3600000)
            });

            res.send(user)
        }else{
            throw new Error("Invalid Credentials")
        }

    }catch(err){
        res.status(400).send("ERROR :" + err.message)
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("logout successfull!!!")
})



module.exports = authRouter;