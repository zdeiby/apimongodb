const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const mySchema = new Schema({
    name: String,
    email:String,
    password:String,
    estado: String,
})

const model=mongoose.model('user', mySchema);
module.exports=model;