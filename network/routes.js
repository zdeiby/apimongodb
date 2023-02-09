const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');
const price =require('../components/price/network');

const routes= function(server){
    server.use('/message',message)
    server.use('/user', user)
    server.use('/price',price)
}
module.exports= routes;