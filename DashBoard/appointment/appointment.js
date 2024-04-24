(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()
/**
* *Contenido de los CRUD
*/
// ? dates
$(document).ready(function(){
$(".dates").click(function(){
  $(this).toggleClass("active");
  var content = $(this).next(".content_dates");
  content.slideToggle(300);
});
});
// ? Doctors 
$(document).ready(function(){
$(".doctors").click(function(){
  $(this).toggleClass("active");
  var content = $(this).next(".content_doctors");
  content.slideToggle(300);
});
});
// ? Medicine 
$(document).ready(function(){
$(".medicine").click(function(){
  $(this).toggleClass("active");
  var content = $(this).next(".content_medicine");
  content.slideToggle(300);
});
});
// ? Patient
$(document).ready(function(){
$(".patient").click(function(){
  $(this).toggleClass("active");
  var content = $(this).next(".content_patient");
  content.slideToggle(300);
});

});

var elementoVisible = true;
let toggle = document.getElementById('sidebarToggle')
toggle.addEventListener('click',()=>{

  let title = document.getElementById('title')
  if (elementoVisible) {
      // Si el elemento está visible, ocultarlo
      title.style.visibility = 'hidden';
  } else {
      // Si el elemento está oculto, mostrarlo
      title.style.visibility = 'visible';
  }
  
  // Invertir el estado de visibilidad para la próxima vez que se haga clic
  elementoVisible = !elementoVisible;
})
var tabla = new DataTable( '#tabla', {

} );
// ? Cargo las citas en la tabla 
fetch('http://localhost:3000/citas/mostrarCitas')
.then((response)=>{
return response.json()
})
.then((response)=>{

 
  let selectPaciente = document.getElementById("paciente")
  let selectMedico = document.getElementById("medico")


  response.map((item=>{
    let fechaVieja = item.fecha
    

    let fechaNueva = new Date(fechaVieja)
    
    let fechaUtil = fechaNueva.toISOString().slice(0, 10)

    item.fecha = fechaUtil


    const optionPaciente = document.createElement('option')
    optionPaciente.value = item.id
    optionPaciente.textContent = item.nombrePaciente
    selectPaciente.appendChild(optionPaciente)

    const optionMedico = document.createElement('option')
    optionMedico.value = item.id
    optionMedico.textContent = item.nombreMedico
    selectMedico.appendChild(optionMedico)

    
  }))

    
    

 console.log(response)

tabla.clear().draw();
// ? Trae los datos que se van a pintar en la tabla
response.forEach(row => { 
  

   tabla.row.add([
        row.idCita,
       row.descripcion,
       row.direccion,
       row.fecha,
       row.horaInicio,
       row.horaFin,
       `<option value="1">${row.nombrePaciente}</option>`,
       `<option value="1">${row.nombreMedico}</option>`,
       `<button type="button" id="btnEditar"  class="bi bi-pencil btn btn-primary"></button>`,
       `<button type="button" id="btnEliminar" class="bi bi-trash btn btn-danger"></button>`
   ]).draw();
});
}) 
let form = document.getElementById('form')
// ? boton Editar del formulario

// ? boton Editar de la tabla
$('#tabla tbody').on('click', '#btnEditar', function() {
// Obtener la fila correspondiente a este botón
var fila = $(this).closest('tr');
// Obtener los datos de la fila
var data = tabla.row(fila).data();
console.log(data);
capturoDatos(data[0],data[1],data[2],data[3],data[4])

form.style.visibility = "visible"
});
// ? Funcion que captura los datos de la fila seleccionada 
// ? y los pinta en el formulario 
function capturoDatos(id,descripcion,direccion,fecha,horaInicio,paciente,medico){
document.getElementById('id').value = id
document.getElementById('descripcion').value = descripcion
document.getElementById('direccion').value = direccion
document.getElementById('fecha').value  = fecha
console.log(fecha)
document.getElementById('horaInicio').value = horaInicio
document.getElementById('paciente').append(paciente)
document.getElementById('medico').append(medico)
}
// ? boton Eliminar de la tabla
$('#tabla tbody').on('click', '#btnEliminar', function() {
// Obtener la fila correspondiente a este botón
var fila = $(this).closest('tr');
// Elimina de la base de datos
// Obtener los datos de la fila
var data = tabla.row(fila).data();
let idMedico = data[0];
fetch(`http://localhost:3000/medico/eliminarMedico/${idMedico}`)
// Eliminar la fila de la tabla
tabla.row(fila).remove().draw();
});

let btnEditarDoctor = document.getElementById('btnEditarDoctor');
btnEditarDoctor.addEventListener('click', ()=>{
let id = document.getElementById('id').value
let nombre = document.getElementById('name').value 
let apellido = document.getElementById('lastname').value 
let email = document.getElementById('email').value 
let especialidad = document.getElementById('especialidad').value 
fetch(`http://localhost:3000/medico/editarMedico/${id}/${nombre}/${apellido}/${email}/${especialidad}`)
form.style.visibility = "hidden"
// ? Cargo los doctores en la tabla 
fetch('http://localhost:3000/medico/mostrarMedicos')
.then((response)=>{
return response.json()
})
.then((response)=>{
tabla.clear().draw();
// ? Trae los datos que se van a pintar en la tabla
response.forEach(row => { 
   tabla.row.add([
        row.id,
       row.nombre,
       row.apellido,
       row.email,
       row.especialidad,
       `<button type="button" id="btnEditar"  class="bi bi-pencil btn btn-primary"></button>`,
       `<button type="button" id="btnEliminar" class="bi bi-trash btn btn-danger"></button>`
   ]).draw();
});
}) 
})

