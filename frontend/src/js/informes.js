const url = 'https://parqueadero2.herokuapp.com/message';
//const url='http://localhost:3000/message'




const select = document.querySelector(".select")
const input=document.querySelector(".entrada")
const inputDate=document.querySelector(".entrada_fecha")
const boton=document.querySelector(".buttonSalida")
const tabla=document.querySelector(".table")

async function lecturaDatos(urlComplete){
    const lectura =await leer(urlComplete)
    let id
    let placa
    let horaE 
    let horaS
    let valorPagado
    let estado;

   tabla.innerHTML=`	<tr>
   <th>ID</th>
   <th>placa</th>
   <th>hora entrada</th>
   <th>hora salida</th>
   <th>valor pagado</th>
   <th>Estado</th>
</tr>`
  

    for(let i=lectura.body.length; i>0; i--){

     id=lectura.body[i-1].message.substring(5,10);
     placa= lectura.body[i-1].placa;
    horaE=lectura.body[i-1].fecha;
    horaS=lectura.body[i-1].horaSalida.substring(0,5);
     valorPagado=lectura.body[i-1].total;
     estado=lectura.body[i-1].estado;
   // let nRecibo=id[i];
   let horaEntrada=new Date(horaE);
   let horaMostrarFinal=horaEntrada.toLocaleTimeString()

   
  const div=document.createElement("TR"); 
  
    const show=`<tr>

    <td>${id}</td>
    <td>${placa}</td>
    <td>${horaMostrarFinal.substring(0,5)}</td>
    <td>${horaS}</td>
    <td>${valorPagado}</td>
    <td>${estado}</td>
</tr>
`
div.innerHTML=show;
tabla.appendChild(div)
    }
   
    const div2=document.createElement("DIV"); 
const imprimir=document.querySelector('#div_imprimir_informe');
const botonI=`<button id="boton_imprimir_informe">imprimir</button>`
div2.innerHTML=botonI;
 imprimir.innerHTML=''
imprimir.appendChild(div2)
const botonImprimir= document.querySelector("#boton_imprimir_informe")
botonImprimir.addEventListener("click",()=>{

        var ficha = document.getElementById('tabla_busqueda').innerHTML;
        
   document.write(ficha)


    window.print()
  setTimeout(() => {
    location.reload()
   }, 100);
    
    }
    
)

}
async function busqueda(){

const date1=inputDate.value.replace('-', '/')
const dateFinal=date1.replace('-', '/')
let fechaEntrada;
if(dateFinal !=''){
let newfecha= new Date(dateFinal)
fechaEntrada=newfecha.toLocaleDateString()
}
else{
    fechaEntrada=''
}


let entrada=input.value.toUpperCase()
if(select.value=='PLACA' && fechaEntrada == '' && entrada == ''){
  
   await lecturaDatos(url)
   
    
}
if(select.value=='PLACA' && fechaEntrada != '' && entrada==''){
  await lecturaDatos(`${url}?fechaEntrada=${fechaEntrada}`)
   
   
}
if(select.value=='PLACA' && fechaEntrada != '' && entrada !=''){
    const lectura =await lecturaDatos(`${url}?fechaEntrada=${fechaEntrada}&placa=${entrada}`)
  
}
if(select.value=='PLACA' && fechaEntrada == '' && entrada !=''){
    const lectura =await  lecturaDatos(`${url}?placa=${entrada}`)
   
}

if(select.value=='FECHA' && fechaEntrada != '' && entrada ==''){
    const lectura =await  lecturaDatos(`${url}?fechaEntrada=${fechaEntrada}`)
 
   
}
if(select.value=='FECHA' && fechaEntrada != '' && entrada !=''){
    const lectura =await lecturaDatos(`${url}?fechaEntrada=${fechaEntrada}&placa=${entrada}`)
  
   
}
if(select.value=='FECHA' && fechaEntrada == '' && entrada !=''){
    const lectura =await  lecturaDatos(`${url}?placa=${entrada}`)
  
   
}



if(select.value=="MENSUALIDADES" && entrada == '' && fechaEntrada==''){
    const lectura =await  lecturaDatos(`${url}?mensualidad=si`)
  
   
}
if(select.value=="MENSUALIDADES" && entrada == '' && fechaEntrada !=''){
    const lectura =await lecturaDatos(`${url}?mensualidad=si&fechaEntrada=${fechaEntrada}`)
  
    
}
if(select.value=="MENSUALIDADES" && entrada != '' && fechaEntrada !=''){
    const lectura =await lecturaDatos(`${url}?mensualidad=si&fechaEntrada=${fechaEntrada}&placa=${entrada}`)
  
  
}
if(select.value=="MENSUALIDADES" && entrada != '' && fechaEntrada ==''){
    const lectura =await  lecturaDatos(`${url}?mensualidad=si&placa=${entrada}`)
    
} 
}
async function leer(url){
  const response = await fetch(url, {
    method:'GET',
  });
  const data = await response.json();

  return data
}



boton.addEventListener("click",busqueda)

