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
// ? Cargo los doctores en la tabla 
fetch('http://localhost:3000/paciente/mostrarPacientes')
.then((response)=>{
return response.json()
})
.then((response)=>{
tabla.clear().draw();
// ? Trae los datos que se van a pintar en la tabla
response.forEach(row => { 
   tabla.row.add([
        row.idPaciente,
        row.nombrePaciente,
        row.apellidoPaciente,
        row.emailPaciente,
        row.telefonoPaciente,
        row.movilPaciente,
        row.fechaNacimiento,
        row.epsPaciente,
        row.usuarioPaciente,
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

capturoDatos(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7])

form.style.visibility = "visible"
});
// ? Funcion que captura los datos de la fila seleccionada 
// ? y los pinta en el formulario 
function capturoDatos(idPaciente,nombrePaciente,apellidoPaciente,emailPaciente,telefonoPaciente,movilPaciente,fechaNacimiento,epsPaciente){
document.getElementById('id').value = idPaciente
document.getElementById('name').value = nombrePaciente
document.getElementById('lastname').value = apellidoPaciente
document.getElementById('email').value = emailPaciente
document.getElementById('telefono').value = telefonoPaciente
document.getElementById('movil').value = movilPaciente
var fecha = new Date(fechaNacimiento);
var formattedFecha = fecha.toISOString().slice(0,10);
document.getElementById('date').value = formattedFecha
document.getElementById('eps').value = epsPaciente
let user =  document.getElementById('user')
fetch(`http://localhost:3000/usuario/MostrarUsuarios`)
.then((response)=>{
  return response.json()
})
.then((response)=>{
  response.forEach(row=>{
    let option = ` <option value="${row.idUser}">${row.userName}</option>`
    user.innerHTML += option
  })
})
}
// ? boton Eliminar de la tabla
$('#tabla tbody').on('click', '#btnEliminar', function() {
// Obtener la fila correspondiente a este botón
var fila = $(this).closest('tr');
// Elimina de la base de datos
// Obtener los datos de la fila
var data = tabla.row(fila).data();
let idPaciente = data[0];
fetch(`http://localhost:3000/paciente/eliminarPaciente/${idPaciente}`)
// Eliminar la fila de la tabla
tabla.row(fila).remove().draw();
});
let user =  document.getElementById('user')
var option ;
let UsuarioElegido
user.addEventListener('change', function(){
   option = user.options[user.selectedIndex]
  UsuarioElegido = option.value
})
let btnEditarDoctor = document.getElementById('btnEditarDoctor');
btnEditarDoctor.addEventListener('click', ()=>{
  
 let id = document.getElementById('id').value
 let name = document.getElementById('name').value 
 let lastname = document.getElementById('lastname').value 
 let email =  document.getElementById('email').value 
 let telefono = document.getElementById('telefono').value 
 let movil = document.getElementById('movil').value
 let date = document.getElementById('date').value 
 let eps = document.getElementById('eps').value 
 let idUsuario =  UsuarioElegido
 form.style.visibility = "hidden"

fetch(`http://localhost:3000/paciente/editarPaciente/${id}/${name}/${lastname}/${email}/${telefono}/${movil}/${date}/${eps}/${idUsuario}`)
// ? Cargo los doctores en la tabla 
fetch('http://localhost:3000/paciente/mostrarPacientes')
.then((response)=>{
return response.json()
})
.then((response)=>{
tabla.clear().draw();
// ? Trae los datos que se van a pintar en la tabla
response.forEach(row => { 
   tabla.row.add([
    row.idPaciente,
    row.nombrePaciente,
    row.apellidoPaciente,
    row.emailPaciente,
    row.telefonoPaciente,
    row.movilPaciente,
    row.fechaNacimiento,
    row.epsPaciente,
    row.usuarioPaciente,
       `<button type="button" id="btnEditar"  class="bi bi-pencil btn btn-primary"></button>`,
       `<button type="button" id="btnEliminar" class="bi bi-trash btn btn-danger"></button>`
   ]).draw();
});
}) 
})

