(() => {
    'use strict'
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })()

  
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
var tabla = new DataTable( '#tabla', {
  
} );
// ? Cargo los doctores en la tabla 
fetch('http://localhost:3000/medicamento/mostrarMedicamento')
.then((response)=>{
return response.json()
})
.then((response)=>{
 tabla.clear().draw();
 // ? Trae los datos que se van a pintar en la tabla
 response.forEach(row => { 
  let estado = ""
    if(row.stock == 1)
    {
    estado = "Activo";
    }else{
      estado = "Inactivo";
    }
     tabla.row.add([
        row.id,
         row.descripcion,
          estado,
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
  capturoDatos(data[0],data[1],data[2])
 
  form.style.visibility = "visible"
});
// ? Funcion que captura los datos de la fila seleccionada 
// ? y los pinta en el formulario 
function capturoDatos(id,descripcion,stock){
  document.getElementById('id').value = id
  document.getElementById('des').value = descripcion
  document.getElementById('stock').value = stock
}
// ? boton Eliminar de la tabla
$('#tabla tbody').on('click', '#btnEliminar', function() {
 // Obtener la fila correspondiente a este botón
 var fila = $(this).closest('tr');
 // Elimina de la base de datos
// Obtener los datos de la fila
var data = tabla.row(fila).data();
let idMedicamento = data[0];
fetch(`http://localhost:3000/medicamento/eliminarMedicamento/${idMedicamento}`)
 // Eliminar la fila de la tabla
 tabla.row(fila).remove().draw();
});

let btnEditarDoctor = document.getElementById('btnEditarDoctor');
btnEditarDoctor.addEventListener('click', ()=>{
 let id = document.getElementById('id').value
 let descripcion = document.getElementById('des').value
 let stock = document.getElementById('stock').value

 fetch(`http://localhost:3000/medicamento/editarMedicamento/${id}/${descripcion}/${stock}`)
 form.style.visibility = "hidden"
// ? Cargo los doctores en la tabla 
fetch('http://localhost:3000/medicamento/mostrarMedicamento')
.then((response)=>{
return response.json()
})
.then((response)=>{
 tabla.clear().draw();
 // ? Trae los datos que se van a pintar en la tabla
 response.forEach(row => { 
     tabla.row.add([
      row.id,
      row.descripcion,
      row.stock,
         `<button type="button" id="btnEditar"  class="bi bi-pencil btn btn-primary"></button>`,
         `<button type="button" id="btnEliminar" class="bi bi-trash btn btn-danger"></button>`
     ]).draw();
 });
}) 
})

