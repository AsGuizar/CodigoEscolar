let datos=[]    
let registroactual=-1
let totalderegistros=0
let titulo2=document.getElementById("titulo2")
let nombre=document.getElementById("nombre") 
let direccion=document.getElementById("direccion")
let telefono=document.getElementById("telefono")
let nuevo=document.getElementById("nuevo")
let editar=document.getElementById("editar")
let eliminar=document.getElementById("eliminar")
let buscar=document.getElementById("buscar")
let navegacion=document.getElementById("navegacion")
let guardarnuevo=document.getElementById("guardarnuevo")
let listado=document.getElementById("listado")
let editarbarra=document.getElementById("editarbarra")
let barraacciones=document.getElementById("barraacciones")
let barrabuscar=document.getElementById("barrabuscar")

function buscarvalor() {
  let texto = document.getElementById("texto");
  let campo = document.getElementById("campo");

  if (!!texto.value) {
    let encontrado = false;
    let indiceEncontrado = -1;
    for (let i = 0; i < datos.length; i++) {
      if (
        datos[i][campo.value]
          .toLowerCase()
          .includes(texto.value.toLowerCase())
      ) {
        encontrado = true;
        indiceEncontrado = i;
        break;
      }
    }
  
    if (encontrado) {
      alert("Valor encontrado en la fila ");
    } else {
      alert("Valor no encontrado en la tabla");
    }
  }
}

    //showToast("El campo en el vas a buscar es "+campo.value)


function guardareditar()
{
    datos[registroactual].nombre=nombre.value
    datos[registroactual].direccion=direccion.value
    datos[registroactual].telefono=telefono.value
    sololectura()
    navegacion.style.display='block';
    barraacciones.style.display='block';
    editarbarra.style.display='none';
    mostrarListado()
}

function cancelareditar()
{
    navegacion.style.display='block';
    barraacciones.style.display='block';
    editarbarra.style.display='none';
    barrabuscar.style.display='block';
    sololectura();

}

function editarregisto()
{
    
    if(registroactual>=0)
    {
    navegacion.style.display='none';
    barraacciones.style.display='none';
    editarbarra.style.display='block';
    barrabuscar.style.display="block";
    soloescritura()
    }
    else
    showToast("No hay registros")
    
}


function sololectura()
{
    nombre.readOnly = true
    direccion.readOnly=true
    telefono.readOnly=true
}

function borrar()
{
    if(totalderegistros>0)
    {
        datos.splice(registroactual,1)        
        registroactual--
        totalderegistros=datos.length
        barradenavegacion()
        mostrarregistro()
        mostrarListado()
    }
}

function primero()
{
    if(totalderegistros>0)
    {
        registroactual=0
        mostrarregistro()
        barradenavegacion()
    }
}



function ultimo()
{
    if(totalderegistros>0)
    {
        registroactual=totalderegistros-1
        mostrarregistro()
        barradenavegacion()
    }
}
function siguiente()
{
if(registroactual<(totalderegistros-1))
{
registroactual++
barradenavegacion()
mostrarregistro()
}

}

function anterior()
{
    if(registroactual>0)
    {
     registroactual--
     barradenavegacion()
     mostrarregistro()   
    }
}


function soloescritura()
{
    nombre.readOnly = false
    direccion.readOnly=false
    telefono.readOnly=false
}

function mostrarListado()
{
    listado.innerHTML = ""; //Limpiar el listado anterior

    //Crear la tabla
    let tabla = document.createElement("table");
    let encabezado = tabla.createTHead();
    let filaEncabezado = encabezado.insertRow();
    let celdaNombre = filaEncabezado.insertCell();
    let celdaDireccion = filaEncabezado.insertCell();
    let celdaTelefono = filaEncabezado.insertCell();
    celdaNombre.innerHTML = "<b>Nombre</b>";
    celdaDireccion.innerHTML = "<b>Dirección</b>";
    celdaTelefono.innerHTML = "<b>Teléfono</b>";

    let cuerpo = document.createElement("tbody");
    tabla.appendChild(cuerpo);

    //Agregar los datos a la tabla
    for(let i = 0; i < datos.length; i++)
    {
        let fila = cuerpo.insertRow();
        let celdaNombre = fila.insertCell();
        let celdaDireccion = fila.insertCell();
        let celdaTelefono = fila.insertCell();
        celdaNombre.innerHTML = datos[i].nombre;
        celdaDireccion.innerHTML = datos[i].direccion;
        celdaTelefono.innerHTML = datos[i].telefono;
    }

    listado.appendChild(tabla); //Agregar la tabla al div del listado
}


function ocultarnuevo()
{
 barraacciones.style.display='none';   
 barrabuscar.style.display='none';
 navegacion.style.display='none';
 barraguardar.style.display='block';
}

function cancelarguardarocultar()
{
 barraacciones.style.display='block'
 barrabuscar.style.display='block';
 navegacion.style.display='block';
 barraguardar.style.display='none';
 mostrarregistro()
 sololectura()
}

function nuevoregistro()
{
    ocultarnuevo()
    nombre.value=""
    direccion.value=""
    telefono.value="" 
    soloescritura()  
}

function mostrarregistro()
{
    if(registroactual>=0)
    {
    nombre.value=datos[registroactual].nombre
    direccion.value=datos[registroactual].direccion
    telefono.value=datos[registroactual].telefono
    mostrarListado();
    }
    else 
    {
        nombre.value=""
        direccion.value=""
        telefono.value=""
        listado.value=""
    }
}

function guardar()
{
if(!!nombre.value && !!direccion.value && !!telefono.value)
{    
persona={nombre:nombre.value,
        direccion:direccion.value,
        telefono:telefono.value}
datos.push(persona)  
   
nombre.value=""
direccion.value=""
telefono.value=""
registroactual=datos.length-1
totalderegistros=datos.length
barradenavegacion()    
mostrarregistro()
cancelarguardarocultar()
showToast("Registro agregado con exito!!")
}
else
showToast("No capturastes todos los datos!!")
}

function barradenavegacion()
 {
    if(totalderegistros>0)
    titulo2.innerHTML="Registro "+(registroactual+1)+" de "+totalderegistros;
    else
    titulo2.innerHTML="No hay registros para mostrar!!"
     
}   
// Un toast para sustituir el alert estandar
function showToast(mensaje) {
  // Crear el elemento del Toast
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = mensaje;

  // Agregar el Toast al contenedor
  const container = document.getElementById("toast-container");
  container.appendChild(toast);

  // Mostrar el Toast
  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  // Ocultar el Toast después de 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 3000);
}

 barradenavegacion()
 mostrarListado()
 sololectura()