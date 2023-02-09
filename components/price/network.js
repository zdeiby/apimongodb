const express = require('express');
const response= require('../../network/response');
const controller = require('./controller')
const router= express.Router();

router.post('/', function(req,res){
    controller.addUser(req.body.carro, req.body.moto)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(err => {
            response.err(req, res, 'internal error', 500, err)
        })
})

router.get('/', function(req,res){
    controller.listUsers()
    .then(users => {
        response.success(req, res, users, 200)
    })
    .catch(err => {
        response.error(req,res, 'internal error', 500, err)
    })
})

router.patch('/:id',function(req, res){
 
    controller.updateMessage(req.params.id, req.body.carro,req.body.moto)
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