const Model = require('./model')
function addUser(user){
    const myUser = new Model(user);
   return myUser.save();
}

function listUsers(){
    return Model.find()
}

async function updateText(id,name,email,password,estado){
    const foundMessage= await Model.findOne({
        _id: id
    })
    foundMessage.name=name;
    foundMessage.email=email;
    foundMessage.password=password;
    foundMessage.estado=estado;
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