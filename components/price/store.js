const Model = require('./model')

function addUser(user){
    const myUser = new Model(user);
   return myUser.save();
}

function listUsers(){
    return Model.find()
}

async function updateText(id,carro,moto){
    const foundMessage= await Model.findOne({
        _id: id
    })
    foundMessage.carro=carro;
    foundMessage.moto=moto;
    const newMessage = await foundMessage.save()
    return newMessage;
}
function removeMessage(id){
    return Model.deleteOne({
        _id: id
    })
}
    
module.exports={
    add: addUser,
    list:listUsers,
    updateText:updateText,
    remove:removeMessage,
}