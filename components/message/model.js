const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({

    placa:String,
    fecha:String,
    estado:String,
    precio:String,
    total:String,
    horaSalida:String,
    fechaEntrada:String,
    fechaSalida:String,
    mensualidad:String,
    message:{
        type:String,
        required: true,
    },

    date: Date,
});

const model=mongoose.model('Message', mySchema);
module.exports = model;