let tbody = document.getElementById('tbody');
let btnCrear = document.getElementById('btnCrear');
let id = document.getElementById('idPaciente');
let nombre = document.getElementById('nombre');
let lastname = document.getElementById('apellido');
let email = document.getElementById('email');
let telefono = document.getElementById('telefono');
let movil = document.getElementById('movil');
let fecha = document.getElementById('fecha');
let eps = document.getElementById('eps');
let pass = document.getElementById('pass');
let inputPass = document.getElementById('inputPass');
let formPaciente = document.getElementById('formPaciente');
let title = document.getElementById('exampleModalLabel');
let btn = document.getElementById('btn');

const formData = new FormData();


const modalPaciente = new bootstrap.Modal(
  document.getElementById("exampleModal"),
);
var opcion = "";


const cerrarModal = () =>{
  modalPaciente.hide();
}

btnCrear.addEventListener("click", () => {

  id.value = "";
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  telefono.value = "";
  movil.value = "";
  fecha.value = "";
  eps.value = "";
  pass.value = "";
  inputPass.hidden = false;
  id.removeAttribute("readonly");
  title.textContent = "Agregar Paciente" 
 btn.textContent = "Agregar"
  modalPaciente.show();
  opcion = "crear";
});

// evento requerido para seleccionar valores de una fila de tabla

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//PROCEDIMIENTO LISTAR TODOS LOS REGISTROS
const listarPacientes = () => {
  fetch("http://localhost:3000/pacientes/listar")
    .then((response) => {
      return response.json();
      
    })
    .then((datos) => {
      console.log(datos)
      datos[0].forEach(element => {
        let nacimiento = element.fechaNacimiento.slice(0,10)
        let fila = `<tr>
        <td class="text-center">${element.idPaciente}</td>
        <td class="text-center">${element.nombrePaciente}</td>
          <td class="text-center">${element.apellidoPaciente}</td>
          <td class="text-center">${element.emailPaciente}</td>
          <td class="text-center">${element.telefonoPaciente}</td>
          <td class="text-center">${element.movilPaciente}</td>
          <td class="text-center">${nacimiento}</td>
          <td class="text-center">${element.epsPaciente}</td>
        
          <td class="text-center"><button class="btnEditar btn btn-primary btn-sm">Editar</button></td>
          <td class="text-center"><button class="btnBorrar btn btn-danger btn-sm">Borrar</button></td>
          </tr>`;
        tbody.innerHTML += fila;
      });
      
    })
    .catch((error) =>{
      Swal.fire({
        icon: "error",
        title: "No es posible conectarse a la API",
        text: error,
      });
    })
    
};
listarPacientes();


on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML;
  let id = fila.children[0].innerHTML;
  console.log(id)
  Swal.fire({
    title: "Seguro que desea borrar el Id: "+id+" ? " ,
     text: "Se borrara de la base de datos !!!", 
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro !",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://localhost:3000/pacientes/eliminar/"+id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => location.reload());
    }
  });
});

//PROCEDIMIENTO EDITAR
on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML; //otra forma deinvocar el valor de la fila
  //valores de la fila

  
  let idPaciente = fila.children[0].innerHTML;
  let nombrePaciente = fila.children[1].innerHTML;
  let apellidoPaciente = fila.children[2].innerHTML;
  let emailPaciente = fila.children[3].innerHTML;
  let telefonoPaciente = fila.children[4].innerHTML;
  let movilPaciente = fila.children[5].innerHTML;
  let fechaNacimiento = fila.children[6].innerHTML;
  let epsPaciente = fila.children[7].innerHTML;
 


 

 id.value = idPaciente
 nombre.value = nombrePaciente
 lastname.value = apellidoPaciente
 email.value = emailPaciente
 telefono.value = telefonoPaciente
 movil.value = movilPaciente
 fecha.value = fechaNacimiento
 eps.value = epsPaciente
 inputPass.hidden = true;
 id.setAttribute("readonly", "readonly");
 
 
 title.textContent = "Editar Paciente" 
 btn.textContent = "Editar"
 

  opcion = "editar";
  modalPaciente.show();
  
  
});


const actualizar = () => {
  
  
    fetch(
      "http://localhost:3000/pacientes/editar/" +
        id.value +
        "/" +
        nombre.value +
        "/" +
        lastname.value +
        "/" +
        email.value +
        "/" +
        telefono.value +
        "/" +
        movil.value +
        "/" +
        fecha.value +
        "/" +
        eps.value +
       
        "" , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
    )
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length === 0) {
        } else {
          Swal.fire({
            title: res.message,

            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "pacientes.html";
            }
          });
        }
      });

  }


// GUARDAR EL FORMULARIO

formPaciente.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {

        fetch("http://localhost:3000/pacientes/crear/"+id.value+"/"+nombre.value+"/"+lastname.value+"/"+email.value+"/"+telefono.value+"/"+movil.value+"/"+fecha.value+"/"+eps.value+"/"+pass.value+"",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);

            if (Object.keys(res).length === 0) {
            } else {
              Swal.fire({
                title: res.message,

                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "pacientes.html";
                }
              });
            }
          });
 
  }

  if (opcion == "editar") {
    actualizar();
  }
  modalPaciente.hide();
});

