const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    messages: [{
        prompt:String,
        message:String
    }],
},
{timestamps:true});

module.exports = mongoose.model("Chat", chatSchema)
    

