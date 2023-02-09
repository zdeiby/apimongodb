const db = require('mongoose');

db.set('strictQuery', false);
db.Promise = global.Promise;

async function connect(url){
//mongodb+srv://parqueadero:1234@parqueadero.bukk0tt.mongodb.net/?retryWrites=true&w=majority
await db.connect(url, {
    useNewUrlParser: true,
});
console.log('[db] conectada con exito ');  
}

module.exports=connect;