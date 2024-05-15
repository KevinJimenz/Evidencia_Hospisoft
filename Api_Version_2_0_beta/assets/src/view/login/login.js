
// ! boton de registro
let btnRegister = document.getElementById("btnRegister");
btnRegister.addEventListener("click", () => {
  window.location.href = "../registro/registro.html";
});
// ! boton de Login
document.getElementById("btnLogin").addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  fetch(`http://localhost:3000/usuario/verificarUsuario/${email}/${password}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // ? Verifico si es usuario o admin
      if (response[0].rol == 1) {
        localStorage.setItem("rol",response[0].rol)
        window.location.href = "../graficas/graficas.html";
      } else if (response[0].rol == 2) {
        localStorage.setItem("rol",response[0].rol)
        window.location.href = "../graficas/graficas.html";
      }
    });
});

/* const login = () => {
  fetch(
    "http://localhost:3000/usuario/verificarUsuario/" +
      email.value +
      "/" +
      password.value
  )
    .then((res) => res.json())
    .then((res) => {
      if (Object.keys(res).length === 0) {
        fetch(
          "http://localhost:3000/paciente/MostrarPacientes/" +
            email.value +
            "/" +
            password.value
        )
          .then((rpta) => rpta.json())
          .then((rpta) => {
            if (Object.keys(rpta).length === 0) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Alguno de los campos son incorrectos!!",
                footer: "",
              });
            } else {
              window.location.href = "../Vista_Paciente/index.html";
            }
          });
      } else {
        window.location.href = "../graficas/graficas.html";
      }
    });
}; */
