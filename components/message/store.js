const Model=require('./model')


function addMessage(message){
   // list.push(message)
   const myMessage = new Model(message);
   myMessage.save();
}
async function getMessages(filterUser){
    let filter = {};
    console.log(filterUser)
    if(filterUser.placa != undefined  && filterUser.fechaEntrada == undefined ){
        filter={placa:filterUser.placa,
        }
    }
    if(filterUser.placa != undefined  && filterUser.fechaEntrada != undefined ){
        filter={placa:filterUser.placa,
            fechaEntrada:filterUser.fechaEntrada
        }
    }


    if(filterUser.fechaEntrada != undefined && filterUser.placa == undefined){
        filter={fechaEntrada:filterUser.fechaEntrada}
    }
    if(filterUser.fechaEntrada != undefined  && filterUser.placa != undefined){
      filter={fechaEntrada:filterUser.fechaEntrada,
              placa:filterUser.placa,}
    }
    if(filterUser.mensualidad != undefined && filterUser.fechaEntrada == undefined && filterUser.placa == undefined){
        filter={mensualidad:filterUser.mensualidad}
    }
    if(filterUser.mensualidad != undefined && filterUser.fechaEntrada != undefined && filterUser.placa == undefined){
        filter={mensualidad:filterUser.mensualidad,
                fechaEntrada:filterUser.fechaEntrada}
    }
    if(filterUser.mensualidad != undefined && filterUser.fechaEntrada != undefined && filterUser.placa != undefined){
        filter={mensualidad:filterUser.mensualidad,
                fechaEntrada:filterUser.fechaEntrada,
                placa:filterUser.placa}
    }
    if(filterUser.mensualidad != undefined && filterUser.fechaEntrada == undefined && filterUser.placa != undefined){
        filter={mensualidad:filterUser.mensualidad,
            placa:filterUser.placa }
    }

 
 
   const messages = await Model.find(filter);
    return messages;
}

async function updateText(id,placa,fecha,estado,precio,message,total,horaSalida,fechaEntrada,fechaSalida,mensualidad){
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.placa=placa;
   foundMessage.fecha=fecha;
   foundMessage.estado=estado;
    foundMessage.precio=precio;
    foundMessage.total=total;
    foundMessage.horaSalida=horaSalida
    foundMessage.message = message;
    foundMessage.fechaEntrada=fechaEntrada;
    foundMessage.fechaSalida=fechaSalida;
    foundMessage.mensualidad=mensualidad;
   const newMessage = await foundMessage.save();
   return newMessage;
}
function removeMessage(id){
    return Model.deleteOne({
        _id: id
    })
}
module.exports={
    add:addMessage,
    list: getMessages,
    updateText:updateText,
    remove:removeMessage,
    //get
    //update
    //delete
}