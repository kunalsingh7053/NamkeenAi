const mongoose = require("mongoose")

const chatSchema =  new mongoose.Schema({
user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    require:true
},
title:{
    type:String,
    required:true
},
lastActivity:{
    type:Date,
    default:Date.now 
} 

},{
    timestamps: true
})
const chatModel = mongoose.model("chat", chatSchema)
module.exports = chatModel;