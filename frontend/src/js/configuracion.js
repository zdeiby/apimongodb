const url ='https://parqueadero2.herokuapp.com/user';
const url2 ='https://parqueadero2.herokuapp.com/price';

const container = document.querySelector(".container1");
const link_tarifa = document.querySelector(".link_tarifa");
const link_usuarios = document.querySelector(".link_usuarios");
const link_impresoras = document.querySelector(".link_impresoras");
const boton = document.querySelector(".botones");
// aca lo llame

async function formularioTarifas() {
      const div = document.createElement("DIV") // crea un div en memoria 
      container.innerHTML = ` `;
      container.appendChild(div);
      let variableError = ` 
    <div id="container2">
                    
          <h2> Defina la tarifa para: </h2> 
          <h3>AUTOMOVIL:</h3>
          <input type="text" class="iCarro"> 
          <button class="guardar_carro">Guardar</button><br><br>
          <h3>MOTO: </h3>
          <input type="text" class="input_tarifa iMoto">
          <button id="boton_guardar" class="guardar_Moto ">Guardar</button>
      
    </div> 
    <div class="containertarifas" id="containertarifas">
    </div>                  
          `       // crea el formularios para el div
      div.innerHTML = variableError;            // metemos el mensaje al div que creamos
      container.appendChild(div);
      // metemos el div en memoria al container del html    
      botonCarro=document.querySelector('.guardar_carro')
      inputCarro=document.querySelector('.iCarro')
      botonMoto=document.querySelector('.guardar_Moto')
      inputMoto=document.querySelector('.iMoto')

      botonCarro.addEventListener("click", carro)
      botonMoto.addEventListener("click", moto)
      let MostarPrecio=await leerPrecio()
     let tarifas=document.querySelector('.containertarifas')
     tarifas.innerHTML=`<h3>Precio actual:</h3>
     <h3>carro: ${MostarPrecio.body[0].carro}</h3>
     <h3>moto: ${MostarPrecio.body[0].moto}</h3>`
      async function carro(){
            if(inputCarro.value !='' &&  !isNaN(inputCarro.value)){
                  let datosPrecio=await leerPrecio()
                  
               await precio('63e183f27dda95ae0da4ebcd', {
                        carro:inputCarro.value,
                        moto:datosPrecio.body[0].moto
                  })
                  formularioTarifas()
            }
      }
      async function moto(){
            if(inputMoto.value !=''  &&  !isNaN(inputMoto.value)){
                  let datosPrecio=await leerPrecio()
                await  precio('63e183f27dda95ae0da4ebcd', {
                        moto:inputMoto.value,
                        carro:datosPrecio.body[0].carro
                  })
                  formularioTarifas()
            } 
      }
}




link_tarifa.addEventListener("click", formularioTarifas)

//_______________________________________________________________________________________________________


function formularioUsuarios() {
      const div = document.createElement("DIV") // crea un div en memoria 
      container.innerHTML = ` `;
      //containercrear.innerHTML = ` `;
      // container.appendChild(div);
      let variableError = `      
      <div id="container">
            <form>               
                  <h2> Menu usuarios </h2>
                  <button class="boton_crear">Crear Usuario</button>
                  <button class="boton_editar">Editar Usuario</button>
                  <button class="boton_eliminar">Eliminar Usuario</button> 
            </form> 
      </div> 
          
      <div class="containercrear" id="containercrear">
			<table>
				<tbody class="tabla" id="tabla">
					<tr>
						<th>Id</th>
						<th>Nombre</th>
						<th>Correo</th>
						<th>Contraseña</th>
						<th>Estado</th>
					</tr>	
				</tbody>
			</table>
		</div>         
            `                                         // crea el formularios para el div
      div.innerHTML = variableError;            // metemos el mensaje al div que creamos
      container.appendChild(div);// metemos el div en memoria al container del html 
      const containercrear = document.querySelector(".containercrear");
      const boton_crear = document.querySelector(".boton_crear");
      const boton_editar = document.querySelector(".boton_editar");
      const boton_eliminar = document.querySelector(".boton_eliminar");
      boton_crear.addEventListener("click", formularioCrear);
      boton_crear.addEventListener("click", lectura);
      boton_editar.addEventListener("click",editar_usuario)
      boton_eliminar.addEventListener("click", eliminar)
}
link_usuarios.addEventListener("click", formularioUsuarios)
link_usuarios.addEventListener("click", lectura)


//_____________________________________________________________________________________________________________________


function formularioCrear() {
      const div = document.createElement("DIV") // crea un div en memoria 
      container.innerHTML = ` `;
      container.appendChild(div);
      let variableError = `   <div>
            <h2>Crear Usuario</h2>
            <label>nombre</label>
            <input class="input_nombre" type="text" placeholder="Nombre"><br>
            <label>correo</label>
            <input class="input_correo" type="text" placeholder="Correo"><br>
            <label>contraseña</label>
            <input class="input_contraseña" type="password" placeholder="Password">
            <button class="boton_ingresar">ingresar</button>      
      
      </div> 
      <div class="containercrear" id="containercrear">
      </div>
       `
      div.innerHTML = variableError;            // metemos el mensaje al div que creamos
      container.appendChild(div);
      

      
      const boton_editar = document.querySelector(".boton_editar");
      const boton_eliminar = document.querySelector(".boton_eliminar");
      const containercrear = document.querySelector(".containercrear");
      
      
      const boton_ingresar = document.querySelector(".boton_ingresar");
      //
     // boton_editar.addEventListener("click", lectura);
      boton_ingresar.addEventListener("click", agregarUsuario);
}
async function agregarUsuario() {
            const input_nombre = document.querySelector(".input_nombre");
            const input_correo = document.querySelector(".input_correo");
            const input_contrasena = document.querySelector(".input_contraseña");
            let nombre = input_nombre.value;
            let correo = input_correo.value;
            let contraseña = input_contrasena.value;
      
            const mandarTodo = await agregar(
                  {
                        name: `${nombre}`,
                        email: `${correo}`,
                        password: `${contraseña}`,
                        estado:'activo'
      
                  })
                  
         
            const div = document.createElement("DIV") // crea un div en memoria 
      container.innerHTML = ` `;
      container.appendChild(div);
      let variableError = `   <div>
            <h2>cargado con exito</h2>
		</div>  `
      div.innerHTML = variableError;            // metemos el mensaje al div que creamos
      container.appendChild(div);

      }

      async function editar_usuario() {
            const objeto = await leer()
        
         tabla.innerHTML=`<h4>editar</h4>
         <tr>
         <th>Id</th>
         <th>Nombre</th>
         <th>Correo</th>
         <th>Contraseña</th>
         <th>Estado</th>
         <th>Enviar</th>
      </tr>`
      
      let a=[];
      let b=[];
      let c=[];
      let d=[];
      let e=[];
      let identi=[];
      
            for (let i = 0; i < objeto.body.length; i++) {
                  //recorro el objeto que me entrego la consulta 
                  // creo un elemento HTML y lo asigno a una variable
                  const div = document.createElement('TR');
                 div.setAttribute("id",`${objeto.body[i]._id}`)
                 //<tr id=>
                 
                  const sql = `    
                  
      
                  <td>${objeto.body[i]._id}</td>
                  <td id="${objeto.body[i].name}">${objeto.body[i].name}</td>
                  <td id="${objeto.body[i].email}">${objeto.body[i].email}</td>
                  <td id="${objeto.body[i].password}">${objeto.body[i].password}</td>
                  <td id="${objeto.body[i].estado}" >${objeto.body[i].estado} </td>
                  <td id=${i}><input class=editar type='checkbox' name='radio'></td>
                        `
                  // creo una variable donde se va a guardar  el resultado de la consulta sql
                  div.innerHTML = sql;
                  tabla.appendChild(div);
                 
                   a[i]=`${objeto.body[i]._id}`
                   b[i]=`${objeto.body[i].name}`
                   c[i]=`${objeto.body[i].email}`
                   d[i]=`${objeto.body[i].password}`
                   e[i]=`${objeto.body[i].estado}`
                   identi[i]=i
              
                  
               
            }
          // 
         tabla.setAttribute("contentEditable","true")
      
            a.forEach(list=> {
                let datoscon=document.getElementById(list)
          
               datoscon.addEventListener("click", (e)=>{
                 // datoscon.setAttribute("contentEditable","true")
                 let start=datoscon.textContent.trimStart() 
              
                 let cadena=start.split("  ")
                 let cadenaSin=[]
                
                for(let i=0; i<cadena.length; i++){
                  if(cadena[i]!==''  && cadena[i] !=='\n'){
      
                     cadenaSin.push(cadena[i])
                  }
                } 
         
      
             nuevaCadena=[]
                cadenaSin.forEach(cadena=>{
                 let finali= cadena.replace('\n', '')
                 nuevaCadena.push(finali)
                
                })
               
             
                 identi.forEach(id=>{
                  let enviarCheck=document.getElementById(id)
                  enviarCheck.addEventListener("click", (e)=>{
                      let ok=e.target.value;
                      if(ok=='on' && nuevaCadena !==''){
                        agregarUnDato(nuevaCadena[0],{
                              name:`${nuevaCadena[1]}`,
                              email:`${nuevaCadena[2]}`,
                              password:`${nuevaCadena[3]}`,
                              estado:`${nuevaCadena[4]}`,
                        }) 
                      }
                  })
               
                 })
               })
            });
            
      
      }
      
async function eliminar(){
      const objeto = await leer()
   
   tabla.innerHTML=`<h4>click en la colunma hasta que seleccione, luego click en id para eliminar </h4>
   <tr>
  <!-- <th>check</th>  -->
   <th>Id</th>
   <th>Nombre</th>
   <th>Correo</th>
   <th>Contraseña</th>
   <th>Estado</th>

</tr>`

let a=[];
let b=[];
let c=[];
let d=[];
let e=[];
let identi=[];

      for (let i = 0; i < objeto.body.length; i++) {
            //recorro el objeto que me entrego la consulta 
            // creo un elemento HTML y lo asigno a una variable
            const div = document.createElement('TR');
         //   tabla.innerHTML=''
           div.setAttribute("id",`${i}`)
           //<tr id=>
           
            const sql = `    
           <!-- <td><input id="${objeto.body[i]._id}+z" class=editar type='checkbox' name='radio'></td> -->
            <td id="${objeto.body[i]._id}">${objeto.body[i]._id}</td>
            <td id="${objeto.body[i].name}">${objeto.body[i].name}</td>
            <td id="${objeto.body[i].email}">${objeto.body[i].email}</td>
            <td id="${objeto.body[i].password}">${objeto.body[i].password}</td>
            <td id="${objeto.body[i].estado}" >${objeto.body[i].estado} </td>
          
                  `
            // creo una variable donde se va a guardar  el resultado de la consulta sql
            div.innerHTML = sql;
            tabla.appendChild(div);
           
             a[i]=`${objeto.body[i]._id}`
             b[i]=`${objeto.body[i]._id}+z`
             c[i]=`${objeto.body[i].email}`
             d[i]=`${objeto.body[i].password}`
             e[i]=`${objeto.body[i].estado}`
             identi[i]=i
      }
     let columna = true;
      let resalto;
      identi.forEach( list => {
            let datos = document.getElementById(list)
         
            datos.addEventListener("click",()=>{
                  columna=!columna
            if(columna == true){
                  datos.setAttribute("class","color") 
                  resalto=true
                 
                 
            }
            if(columna === false){
                  datos.setAttribute("class","vacio") 
                  resalto=false
            }

            })
      })
     a.forEach(  list=> {
            let datoscon=document.getElementById(list)
      
           datoscon.addEventListener("click",deleteOne)
           
  
})


async function deleteOne(e){
      // datoscon.setAttribute("contentEditable","true")
   
  
  
    let id=e.target
    let dato = id.innerHTML
     
      if(resalto==true){
          let confirmacion=  confirm("¿Deseas elimnar el usuario?")
          if(confirmacion==true){
          await borrar(dato)
           tabla.innerHTML=''
          await eliminar()
          }
          
      }
}

}

//_______________________________________________________________________________________________________________

function formularioImpresoras() {
      const div = document.createElement("DIV") // crea un div en memoria 
      container.innerHTML = ` `;
      container.appendChild(div);
      let variableError = ` 
      
      <div id="container">
                           
             <h2> Menu Impresoras: </h2>
            <form>
            <h3>Seleccione Impresora</h3>
            <select> 
                  <option>Impresora 1</option>
                  <option>Impresora 2</option>
                  <option>Impresora 3</option>            
            </select>
            <button> GUARDAR</button>
            <input type="checkbox">
            <label>Elegir como predeterminada</label>
            </form>      
      </div>                   
            `                                         // crea el formularios para el div
      div.innerHTML = variableError;            // metemos el mensaje al div que creamos
      container.appendChild(div);
      // metemos el div en memoria al container del html       

}



link_impresoras.addEventListener("click", formularioImpresoras)


async function leer() {
      const response = await fetch(url, {
            method: 'GET'
      });
      const data = await response.json();
    
      return data
}

async function leerPrecio() {
      const response = await fetch(url2, {
            method: 'GET'
      });
      const data = await response.json();
   
      return data
}

async function lectura() {
      const objeto = await leer()
     
      // containercrear.innerHTML = ` `;
      for (let i = 0; i < objeto.body.length; i++) {
            //recorro el objeto que me entrego la consulta 
            // creo un elemento HTML y lo asigno a una variable
            const div = document.createElement('TR');
            const sql = `    
            <tr>
            <td>${objeto.body[i]._id}</td>
            <td>${objeto.body[i].name}</td>
            <td>${objeto.body[i].email}</td>
            <td>${objeto.body[i].password}</td>
            <td>${objeto.body[i].estado}</td>
                  `
            // creo una variable donde se va a guardar  el resultado de la consulta sql
            div.innerHTML = sql;
            tabla.appendChild(div);
      }
     
}



async function agregar(datos) {
      await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(datos), // data can be `string` or {object}!
            headers: {
                  'Content-Type': 'application/json'
            }
      }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('añadido correctamente'));

}

async function agregarUnDato(id, datos) {
      await fetch(`${url}/${id}`, {
    
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('añadido correctamente'));
    
    }
    
async function precio(id, datos) {
      await fetch(`${url2}/${id}`, {
    
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('añadido correctamente'));
    
    }
    
    async function borrar(id) {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
    
      return data;
    }
    



