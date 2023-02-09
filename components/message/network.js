const express = require('express');
const response= require('../../network/response');
const controller = require('./controller')
const router= express.Router();

router.get('/', function(req,res){

let queries={
    placa:req.query.placa,
    precio:req.query.precio,
    fechaEntrada:req.query.fechaEntrada,
    mensualidad:req.query.mensualidad
}
    


   controller.getMessages(queries)
   .then((messageList)=>{
    response.success(res,res, messageList, 200)
   })
   .catch(e => {
    response.error(req,res, 'Unexpected Error', 500, e);
   })
})

router.post('/', function(req,res){
    controller.addMessage(req.body.placa,req.body.fecha,req.body.estado,req.body.precio,req.body.message,req.body.total,req.body.horaSalida,req.body.fechaEntrada,req.body.fechaSalida,req.body.mensualidad)
        .then((fullMessage)=>{    
            response.success(req,res,fullMessage,201);
        })
        .catch(e => {
            response.error(req,res, 'inf invalida', 400, 'error en el controlador')
        })
})
router.patch('/:id',function(req, res){
 
    controller.updateMessage(req.params.id, req.body.placa,req.body.fecha,req.body.estado,req.body.precio,req.body.message,req.body.total,req.body.horaSalida,req.body.fechaEntrada,req.body.fechaSalida,req.body.mensualidad)
    .then((data)=>{
        response.success(req,res,data,200);
    })
    .catch(e => {
        response.error(req, res, 'error interno', 500, e)
    })
  
})

router.delete('/:id', function(req, res){
    controller.deleteMessage(req.params.id)
    .then(() =>{
        response.success(req, res, `Usuario ${req.params.id} eliminado` , 200)
    })
    .catch ( e=> {
        response.error(req,res, 'error interno', 500, e);
    })
})

module.exports = router;
