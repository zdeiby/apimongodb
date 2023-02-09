const store=require('./store')

function addUser(name,email,password,estado){
    if(!name){
        return Promise.reject('invalid name');
    }

    const user = {
        name,
        email,
        password,
        estado
    }
    return store.add(user)
}

function listUsers(){
    return store.list();
}

function updateMessage(id,name,email,password,estado){
    return new Promise(async  (resolve, reject) =>{
        if(!id || !name){
            reject('invalid data')
            return false;
        }
       const result = await store.updateText(id,name,email,password,estado)
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