const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    userName: {
        type: String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    password: {
        type: String,
       
    },
},{timestamps:true});

module.exports = mongoose.model("User", chatSchema)
    