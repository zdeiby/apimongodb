//BASE DE DATOS

const url = 'https://parqueadero2.herokuapp.com/message';
//const url='http://localhost:3000/message'
const url2 ='https://parqueadero2.herokuapp.com/price';


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



async function borrar(id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  return data;
}

async function leer() {
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();

  return data
}

async function leerPrecio() {
  const response = await fetch(url2, {
    method: 'GET',
  });
  const data = await response.json();

  return data
}

async function leerConId(id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();

  return data;
}

//borrar(19)
//FIN BASE DE DATOS 

const input = document.querySelector(".entrada")
const btnProcesar = document.querySelector(".buttonSalida")
const div_totales = document.querySelector(".div_totales")
const caja_total = document.querySelector(".caja_total")
const moto = document.querySelector(".moto");

const carro = document.querySelector(".carro")
const botonImp = document.querySelector(".mostrarImp");
let motoPrecio = '';
let mensajeMoto = ''
let carroPrecio = '';
let mensajeCarro = ''

async function tarifaMotoFunction() {
  let motoPr=await leerPrecio()

  motoPrecio =parseInt( motoPr.body[0].moto);
  mensajeMoto = 'Moto  ';
  carroPrecio = 0;
  mensajeCarro = '';
  moto.style.opacity = '0.5';
  // carro.style.opacity='1';
  moto.style.background = 'yellow';
  carro.style.background = 'none';

}

async function tarifaCarroFunction() {
  let carroPr = await leerPrecio()
  carroPrecio = parseInt(carroPr.body[0].carro);
  mensajeCarro = 'Carro';
  motoPrecio = 0;
  mensajeMoto = '';
  carro.style.background = 'yellow';
  moto.style.background = 'none';
  carro.style.opacity = '0.5';
  //  moto.style.opacity='1';

  
}



async function mostrarTexto() {
  const lecturaPlaca = await leer();
  const lecturaPlacas = lecturaPlaca.body;

  let value = 0;
  let placa;
  let hora;
  let id;
  let precio;
  let checkout;
  let message = "";
  let arreglo = []
  let position = 0;
  let mensualidades;
  let estado;

  for (let i = 0; i < await lecturaPlacas.length; i++) {
    const entrada = input.value;
    const texto = entrada.toUpperCase()


    if (await lecturaPlacas[i].placa == texto) {
      position = i
      arreglo[i] = lecturaPlacas[i]
      value = 1;


      placa = await lecturaPlacas[i].placa;
      hora = await lecturaPlacas[i].fecha;
      id = await lecturaPlacas[i]._id;
      precio = await lecturaPlacas[i].precio;
      checkout = await lecturaPlacas[i].estado;
      message = await lecturaPlacas[i].message;
      mensualidades= await lecturaPlacas[i].mensualidad;
      estado= await lecturaPlacas[i].estado;

    }


  }
 
  return [value, placa, hora, id, precio, checkout, message, position, mensualidades, estado];

}


async function mostrarFactura() {
  let placaValue = await mostrarTexto();
  let value = await placaValue[0];
  let placas = await placaValue[1];
  let horasde = await placaValue[2];
  let id = await placaValue[3];
  let tarifa = await placaValue[4];
  let checkout = await placaValue[5];
  let mesage = await placaValue[6];
  let message = mesage.toUpperCase()
  let position = await placaValue[7];
  let mensualidades=await placaValue[8];
  let estado= await placaValue[9];

  if (value == 1 && checkout == "INGRESADO" && mensualidades=="no") {
    botonImp.innerHTML = ''
    //CONVERSIONES
    let horaEntrada = new Date(horasde);
    let horaSalida = new Date();
    let hora = Date.parse(horaSalida);
    let hora1 = Date.parse(horaEntrada);
    let horaMostrar = horaEntrada.toLocaleTimeString();
    let horaMostrar1 = horaSalida.toLocaleTimeString();
    let cortarCadena = horaMostrar.substring(0, 5)
    let cortarCadena2 = horaMostrar1.substring(0, 5)
    let fechaEntrada = horaEntrada.toLocaleDateString()
    let fechaSalida = horaSalida.toLocaleDateString()


    let minutos = Math.floor(((hora - hora1) * 1 * 1) / (60 * 1000));
    let horas = Math.floor(((hora - hora1) * 1 * 1) / (60 * 1000 * 60));
    let minutosDay = minutos;
    let minutosDay2 = minutosDay;

    let total = Math.round(minutosDay * ((1 / 60) * tarifa));
    let minutosC = Math.round((horas * tarifa - total) * (60 / 1000) * (-1));
    // FIN CONVERSIONES
    div_totales.innerHTML = '';
    caja_total.innerHTML = '<label class="label_total">TOTAL A PAGAR:</label>'

    const div = document.createElement('DIV');
    const showText = `<label class="label_horas">Tiempo: ${horas} horas + ${minutosC} minutos</label><br>
          <label class="label_horas2">ENTRADA: ${cortarCadena} 21-12-2022</label><br>
          <label class="label_horas3">SALIDA: ${cortarCadena2} 21-12-2022</label><br>
          <label class="label_horas3">${message}</label></div>     
          <label class="label_horas3">Total: ${total}</label></div>                     `
    div.innerHTML = showText;
    div_totales.appendChild(div);

    const cajaTotal = document.createElement('DIV');
    //botonImp.innerHTML='<a href="balancedecaja.html"><button class="boton_balance" id="boton_balance">BALANCE DE CAJA</button></a>'
    const showTextCaja = `<label class="label_precio" id="label_precio">$ ${total}</label>`
    cajaTotal.innerHTML = showTextCaja;
    caja_total.appendChild(cajaTotal)
    // botonImp.innerHTML=''
    const divBoton = document.createElement('DIV');

    const showBoton = `<button id="boton_imprimir" class="print boton_imprimir">imprimir</button> `
    divBoton.innerHTML = showBoton;
    botonImp.appendChild(divBoton)
    const print = document.querySelector('.print')

    let factura = await leer();

    function actualizar() {

      agregarUnDato(id, {
        placa: `${placas}`,
        fecha: `${horaEntrada}`,
        estado: "RETIRADO",
        precio: `${tarifa}`,
        total: `${total}`,
        horaSalida: `${cortarCadena2}`,
        message: `${mesage} `,
        fechaEntrada: `${fechaEntrada}`,
        fechaSalida: `${fechaSalida}`,
        mensualidad: "no"

      })
      
      const datosEnviar = {
        placa: placas,
        fecha: Date(),
        message: message,
        precio: tarifa,
        total: total,
        horaSalida: cortarCadena2,
        horaEntrada: cortarCadena,
        id: position,

      }
      facturaSalida(datosEnviar)

      motoPrecio = ''
      carroPrecio = ''


      factura++;
      setTimeout(() => {
        location.reload()
      }, 1500)
    }
    print.addEventListener('click', actualizar);
    // div_totales.innerHTML = '';
    // return

  }
  if (value == 1 && checkout == "INGRESADO" && mensualidades=="si") {
    
    div_totales.innerHTML = '';

    const div = document.createElement('DIV');
    const showText = `
            
            <style>
            .label_horas {
              word-wrap: break-word;
              posicion:fixed;              
            }
            </style>            
            <label class="label_horas">Esta placa está ingresada en mensualidades, por favor retirala antes de ingresarla acà</label><br>
                         `
    div.innerHTML = showText;
    div_totales.appendChild(div);
  } 
  
  if(value==0 || estado=='RETIRADO'){
      div_totales.innerHTML = '';

    const div = document.createElement('DIV');
    const showText = `
            
            <style>
            .label_horas {
              word-wrap: break-word;
              posicion:fixed;              
            }
            </style>            
            <label class="label_horas">la placa NO ha sido ingresada, elige entre carro o moto</label><br>
                         `
    div.innerHTML = showText;
    div_totales.appendChild(div);
  }
  
  
  return await [value, placas, horasde]
}

async function aggDb() {
  mostrarFactura()

  let precioM = motoPrecio;
  let mensajeM = mensajeMoto;
  let precioC = carroPrecio;
  let mensajeC = mensajeCarro;
  const entradaa = input.value.toUpperCase();
  const value = await mostrarTexto()
  const value2 = value[0]
  const textosalida = value[5]
  let position;
  const tabla = await leer();


  for (let i = 0; i < tabla.body.length; i++) {
    position = i;
  }


  if (mensajeM == "Moto  ") {
    if (motoPrecio != 0) {
      if (textosalida == 'RETIRADO') {
      
        await agregar({
          placa: `${entradaa}`,
          fecha: `${Date()}`,
          estado: "INGRESADO",
          precio: `${precioM}`,
          message: `${mensajeM} ${position}`,
          total: '0',
          horaSalida: 'na',
          fechaEntrada: `${Date()}`,
          fechaSalida: 'na',
          mensualidad: "no"
        })
        motoPrecio = 0;
        div_totales.innerHTML = '';

        const div = document.createElement('DIV');
        const showText = `<label class="label_horas">AGREGADO CON EXITO</label><br>
                       `
        div.innerHTML = showText;
        div_totales.appendChild(div);
        const datosEnviar = {
          placa: entradaa,
          fecha: Date(),
          message: position,
        }
        imprSelec(datosEnviar)
      }
    }

  }
  if (mensajeC == "Carro") {
    if (textosalida == 'RETIRADO') {
      if (carroPrecio != 0) {
        await agregar({
          placa: `${entradaa}`,
          fecha: `${Date()}`,
          estado: "INGRESADO",
          precio: `${precioC}`,
          message: `${mensajeC} ${position}`,
          total: '0',
          horaSalida: 'na',
          fechaEntrada: `${Date()}`,
          fechaSalida: 'na',
          mensualidad: "no"
        })
        carroPrecio = 0
        div_totales.innerHTML = '';

        const div = document.createElement('DIV');
        const showText = `<label class="label_horas">AGREGADO CON EXITO</label><br>
                       `
        div.innerHTML = showText;
        div_totales.appendChild(div);

        const datosEnviar = {
          placa: entradaa,
          fecha: Date(),
          message: position,
        }
        imprSelec(datosEnviar)

      }
    }
  }


  if (value2 == 0 && input.value != '') {
    if (mensajeC == "Carro") {
      if (carroPrecio != 0) {
        const valueD = input.value.toUpperCase()
        await agregar({
          placa: `${valueD}`,
          fecha: `${Date()}`,
          estado: "INGRESADO",
          precio: `${precioC}`,
          message: `${mensajeC} ${position}`,
          total: '0',
          horaSalida: 'na',
          fechaEntrada: `${Date()}`,
          fechaSalida: 'na',
          mensualidad: "no"
        })
        carroPrecio = ''

        div_totales.innerHTML = '';

        const div = document.createElement('DIV');
        const showText = `<label class="label_horas">AGREGADO CON EXITO</label><br>
                                        `
        div.innerHTML = showText;
        div_totales.appendChild(div);
        carroPrecio = 0
        const datosEnviar = {
          placa: entradaa,
          fecha: Date(),
          message: position,
          fechaEntrada: `${Date()}`,
          fechaSalida: 'na',
          mensualidad: "no",
        }
        imprSelec(datosEnviar)
      }
    }
  }
  if (value2 == 0 && input.value != '') {
    if (mensajeM == "Moto  ") {

      if (motoPrecio != 0) {
        const valueD = input.value.toUpperCase()
        await agregar({
          placa: `${valueD}`,
          fecha: `${Date()}`,
          estado: "INGRESADO",
          precio: `${precioM}`,
          message: `${mensajeM}${position}`,
          total: '0',
          horaSalida: 'na',
          fechaEntrada: `${Date()}`,
          fechaSalida: 'na',
          mensualidad: "no"
        })
        motoPrecio = 0
        div_totales.innerHTML = '';

        const div = document.createElement('DIV');
        const showText = `<label class="label_horas">AGREGADO CON EXITO</label><br>
                                        `
        div.innerHTML = showText;
        div_totales.appendChild(div);
        const datosEnviar = {
          placa: entradaa,
          fecha: Date(),
          message: position,
        }
        imprSelec(datosEnviar)

      }
    }
  }
}

const tabla = document.querySelector(".tabla")

async function lecturaVivo() {

  const leerDatos = await leer();
  const leerdatosU = leerDatos.body;

  for (let i = leerdatosU.length; i >= 1; i--) {

    const dato = leerdatosU[i - 1]


    function convertirHora(fecha) {
      // tabla.innerHTML = '';
      let horaEntrada = fecha;
      let hora = new Date(horaEntrada);
      // let hora1= Date.parse(horaEntrada);
      let horaMostrar = hora.toLocaleTimeString();
      //  let horaMostrar1=horaSalida.toLocaleTimeString();
      let cortarCadena = horaMostrar.substring(0, 5)
      //  let cortarCadena2=horaMostrar1.substring(0,5)
      // let fechaEntrada=horaEntrada.toLocaleDateString()
      // let fechaSalida=horaSalida.toLocaleDateString()
      return cortarCadena;
    }
    function convertirRecibo(dato) {
      let recibo = dato.message.substring(5, 20)
      return recibo
    }
    function horaSalida(dato) {
      let salida = dato.horaSalida;
      return salida;
    }


    const fecha = convertirHora(dato.fecha);
    const recibo = convertirRecibo(dato)
    const salida = horaSalida(dato)
    const estado = dato.estado;


    const div = document.createElement('TR');
    const showText = `
        <tr>
          <td>${recibo}</td>
          <td>${leerdatosU[i - 1].placa}</td>
          <td>${fecha}</td>
          <td>${salida}</td>
          <td>${estado}</td>
                  `
    div.innerHTML = showText;
    tabla.appendChild(div);



  }
}


function imprSelec(datos) {//nombre) {
 

  let horaEntrada = new Date(datos.fecha);
  let hora1 = Date.parse(horaEntrada);
  let horaMostrar = horaEntrada.toLocaleTimeString();
  //  let cortarCadena=horaMostrar.substring(0,5)


  let show = ` <style>
  #h2_titulo {
            
            font-family: times new roman;
            font-size: 100%;
            padding-left:1px;
            margin-bottom:30px;
            text-align:center;    
            }
            
  #h2_recibo {
            display:flex;
            margin-top:-10px;
            font-size: 100%;
            font-family: times new roman;
            margin-top:-12px;
  }
  #h2_recibof {
            display:flex;
            margin-bottom:20px;
            font-size: 100%;
            font-family: times new roman;
            margin-top:-12px;
  }
  #a2_pie {
    
    font-family: times new roman;
    font-size: 50%;
    padding-left:1px;
    text-align:center; 
  }
  
  
  
  </style>
            <div id="div_recibo">
            <h2 id="h2_titulo">PARQUEADERO EL MONO</h2>
            <h2 id="h2_recibo">Nit:  </h2>
            <h2 id="h2_recibo">Direccion:</h2>
            <h2 id="h2_recibof">Recibo #:${datos.message}</h2>
            <h2 id="h2_recibo">PLACA : ${datos.placa}</h2>
            <h2 id="h2_recibo">Entrada: ${horaMostrar}</h2>
            
            <a id="a2_pie">Conserve este tiquete para retirar su vehiculo o motocicleta sera requerido,
            en caso de perdida dejar copia de matricula y cedela, recuerde dejar la moto sin seguro, horario de atencion de 
            8 am a 8 pm </a2>
            </div>
            <h2>--------------------------</h2>
            `
  var ficha = document.getElementById('div_totales');
  ficha.innerHTML = show;
  var ventimp = document.write(ficha.innerHTML);
  // ventimp.document.close();
  //   ventimp.print( );
  //ventimp.close();
  window.print(ventimp)
  setTimeout(() => {
    location.reload()
  }, 100);
}

function facturaSalida(datos) {//nombre) {

  let show = ` <style>
    #h2_titulo {
              
              font-family: times new roman;
              font-size: 100%;
              
              
              text-align:center;    
              }
              
    #h2_recibo {
      display:flex;
              margin-top:-10px;
              font-size: 100%;
              font-family: times new roman;
              margin-top:-12px;
    }
    #h2_pie {
      
      font-family: times new roman;
      font-size: 50%;
      padding-left:1px;
      text-align:center; 
    }
    
    
    
    </style>
    
                <h2 id="h2_titulo">BIENVENIDO</h2>
                <h2 id="h2_titulo">PARQUEADERO PEPE</h2>
                <h2 id="h2_titulo">DIRECCION:CRA 12 # 10 - 12</h2>
                <h2 id="h2_recibo">FACTURA#:${datos.id}</h2>
                <h2 id="h2_recibo">PLACA: ${datos.placa}</h2>
                <h2 id="h2_recibo">Valor Hora: ${datos.precio}
                <h2 id="h2_recibo">Hora Entrada: ${datos.horaEntrada}</h2>
                <h2 id="h2_recibo">Hora salida: ${datos.horaSalida}</h2>
                <h2 id="h2_recibo">Modalidad: ${datos.message}</h2>
                <h2 id="h2_recibo">Total: ${datos.total}$</h2>
                <h2>--------------------------</h2>
              
              `

  var ficha = document.getElementById('div_totales');
  ficha.innerHTML = show;
  var ventimp = document.write(ficha.innerHTML);
  // ventimp.document.close();
  //   ventimp.print( );
  //ventimp.close();
  window.print(ventimp)
  setTimeout(() => {
    location.reload()
  }, 100);
}

const tablaShow = lecturaVivo()


btnProcesar.addEventListener("click", aggDb)
moto.addEventListener("click", tarifaMotoFunction)
carro.addEventListener("click", tarifaCarroFunction);


