const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required : true,
        minLength : 4,
        maxLength :50,
    },
    lastName :{
        type:String
    },
    emailId:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value);
            }
        },

    },
    password:{
        type:String,
        required : true,
        
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","Others"],
            message:"{VALUE} is not a valid gender type"
        }
        // validate(value) {
        //     if (!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid");
        //     }
        // }
        
    },
    photoUrl :{
        type:String,
        default:"https://imgs.search.brave.com/oDmalKgHkHpFlYCZKQgQSmpt1PnjGFLFriNnJ0sdPbs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMi53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzI1LmpwZz9z/c2w9MQ",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL: " + value);
            }
        },
    },
        about:{
            type:String,
            default:"This is default about section"
        },
        skills: {
            type: [String],
        },
        
},
    {
    timestamps : true
  }    

);


userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{
        expiresIn:"7d"
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    

    const ispasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return ispasswordValid;
}

module.exports = mongoose.model("User",userSchema);