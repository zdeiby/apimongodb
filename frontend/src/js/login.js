const url ='https://parqueadero2.herokuapp.com/user';

button_ingresar = document.querySelector(".button_ingresar");
input_nombre = document.querySelector(".input_nombre");
input_password = document.querySelector(".input_password");
container = document.querySelector(".container_login");
errorColor = document.querySelector(".errorColor");



function validarUsuario () {


}
button_ingresar.addEventListener("click", lectura)


async function leer() {
    const response = await fetch(url, {
          method: 'GET'
    });
    const data = await response.json();
  
    return data
}

async function lectura() {
    const objeto = await leer()
    
    // containercrear.innerHTML = ` `;
    for (let i = 0; i < objeto.body.length; i++) {
       
         

   

    if(objeto.body[i].name == input_nombre.value && objeto.body[i].password == input_password.value) {
       
        let activo = window.localStorage.setItem("activo",objeto.body[i].estado)
        let datos = window.localStorage.setItem("usuario",objeto.body[i].name);
        let datos1 = window.localStorage.setItem("email",objeto.body[i].email);
        let datos2 = window.localStorage.setItem("contraseña",objeto.body[i].password);
        let datos3 = window.localStorage.setItem("estado",objeto.body[i].estado);
        window.open('operaciones.html');
        window.close('login.html');        
        
     
        const div = document.createElement("DIV") // crea un div en memoria 
        container.innerHTML = `Usuario logeado `;

    } else {
        
        console.error("no validado");
         
       errorColor.setAttribute("class", "on")
       

        }
        
    }
     
}
button_ingresar.addEventListener("click", lectura)
