// ! Cargar usuarios 
let user = document.getElementById('user')
fetch(`http://localhost:3000/usuario/traerUsuario`)
.then((response) =>{ return response.json()} ) 
.then((response) => {
  response.map((element) => {
    let option = `
    <option value="${element.id}">${element.nombre}</option>  
    `;
    user.innerHTML += option ;
  })

})
// ! Bototn login
let btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", () => {
  window.location.href = "../Login/Login.html";
});
// ! Boton Register to patient
document.getElementById("btnRegister").addEventListener('click', () => {
  let nombre = document.getElementById("name").value;
  let apellido = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let movil = document.getElementById("movil").value;
  let telefono = document.getElementById("tel").value;
  let fecha = document.getElementById("date").value;
  let eps = document.getElementById("eps").value;
  var id = parseInt(user.options[user.selectedIndex].value) 
  if ( 
    nombre.length == 0 ||
    apellido.length == 0 ||
    email.length == 0 ||
    password.length == 0 ||
    movil.length == 0 || 
    telefono.length == 0 ||
    eps.length == 0
  )
  {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Todos los campos deben ser completados !!"
    });
  }
  else{
    fetch(`http://localhost:3000/pacientes/verificarPaciente/${email}`)
    .then((response) => { return response.json() })
    .then((response)=>{
      // ? Valido si el correo se encuentra registrado
      // ? De lo contrario agrega al paciente
      if ( response[0].cantidad == 1  )
        {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El correo ya se encuentra registrado!!",
            footer : "Intentalo con una nueva direccion de correo."
          });
        }
        else {
      // ? Agrego al paciente a la base de datos
          fetch(`http://localhost:3000/pacientes/crear/${nombre}/${apellido}/${email}/${telefono}/${movil}/${fecha}/${eps}/${id}/${password}`)
          .then((res) =>{ return res.json() })
          .then((res)=>{
            console.log(res)
            Swal.fire({
              title: res.message,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../Index.html";
              }
            });
          })
        }
    })
  }
});
