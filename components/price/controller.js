const store=require('./store')

function addUser(carro,moto){
    if(!carro){
        return Promise.reject('invalid name');
    }

    const user = {
        carro,
       moto,
      
    }
    return store.add(user)
}

function listUsers(){
    return store.list();
}

function updateMessage(id,carro,moto){
    return new Promise(async  (resolve, reject) =>{
        if(!id || !carro){
            reject('invalid data')
            return false;
        }
       const result = await store.updateText(id,carro,moto)
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
    addUser,
    listUsers,
    updateMessage,
    deleteMessage,
}