const mongoose = require("mongoose");
const connectDB = async ()=>{
   await mongoose.connect(
   "mongodb+srv://Namastedev:09rJRQGBUbt5gEFF@cluster0.s9mm3gf.mongodb.net/devTinder"
);
};

module.exports = connectDB;
