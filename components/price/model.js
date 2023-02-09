const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const mySchema = new Schema({
    carro: String,
    moto:String,
})

const model=mongoose.model('price', mySchema);
module.exports=model;