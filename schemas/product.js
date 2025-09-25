let mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    price:{
        type:Number,
        default:1
    },
    description:{
        type:String,
        default: "good product"
    },
    category:{
        type:String,
        required: true
    }
})
module.exports = new mongoose.model('product',schema)