const store = require('./store')

function addMessage(placa, fecha,estado,precio,message,total,horaSalida,fechaEntrada,fechaSalida,mensualidad){
  return new Promise((resolve, reject )=>{
    if(!placa || !message){
        console.error('[mesageController] no hay usuario o mensaje')
        return reject('los datos son incorrectos');
        return false
    }
    const fullMessage = {
            placa: placa,
            fecha: fecha,
            estado:estado,
            precio:precio,
            message: message,
            total:total,
            horaSalida:horaSalida,
            fechaEntrada:fechaEntrada,
            fechaSalida:fechaSalida,
            mensualidad:mensualidad,
            date: new Date(),
        }
        store.add(fullMessage)
        resolve(fullMessage)

  })
    
}

function getMessages(filterUser){
    return new Promise((resolve, reject)=>{
        resolve(store.list(filterUser))
    })
}
function updateMessage(id,placa,fecha,estado,precio,message,total,horaSalida,fechaEntrada,fechaSalida,mensualidad){
    return new Promise(async  (resolve, reject) =>{
        if(!id || !message){
            reject('invalid data')
            return false;
        }
       const result = await store.updateText(id,placa,fecha,estado,precio,message,total,horaSalida,fechaEntrada,fechaSalida,mensualidad)
       resolve(result)
    })
}

function deleteMessage(id){
    return new Promise((resolve, reject)=>{
        if(!id){
            reject('ID invalido')
            return false;
        }
        store.remove(id)
        .then(()=>{ 
            resolve()
        })
        .catch(e => {
            reject(e)
        })
    })
}


module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}