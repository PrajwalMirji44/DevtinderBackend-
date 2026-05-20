const mongoose = require("mongoose");
const connectDB = async ()=>{
   await mongoose.connect(
   "mongodb://Namastedev:test123@ac-fm5jbcw-shard-00-00.s9mm3gf.mongodb.net:27017,ac-fm5jbcw-shard-00-01.s9mm3gf.mongodb.net:27017,ac-fm5jbcw-shard-00-02.s9mm3gf.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-6fsvzb-shard-0&authSource=admin&appName=Cluster0"

);
};

module.exports = connectDB;
