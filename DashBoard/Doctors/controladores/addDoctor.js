/**
 * *Add Doctor
 */
// ? Capturo datos
let btnAgregar = document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', ()=>{
    let nombreMedico = document.getElementById('name').value
    let apellidoMedico = document.getElementById('lastname').value
    let correo = document.getElementById('email').value
    let especialidad = document.getElementById('espe').value
    // ? Hago el fetch con los datos y se inserta en tabla 
    fetch(`http://localhost:3000/medico/crearMedico/${nombreMedico}/${apellidoMedico}/${correo}/${especialidad}`)
})
