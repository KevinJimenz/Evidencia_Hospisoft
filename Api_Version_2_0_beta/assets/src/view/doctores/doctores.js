let tbody = document.getElementById('tbody');
let btnCrear = document.getElementById('btnCrear');
let idDoctor = document.getElementById('idDoctor');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
let especialidad = document.getElementById('especialidad');
let formDoctor = document.getElementById('formDoctor');
let title = document.getElementById('exampleModalLabel');
let btn = document.getElementById('btn');

const formData = new FormData();


const modalDoctor = new bootstrap.Modal(
  document.getElementById("exampleModal"),
);
var opcion = "";


const cerrarModal = () =>{
  modalDoctor.hide();
}

btnCrear.addEventListener("click", () => {

  idDoctor.value = "";
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  especialidad.value = "";
  title.textContent = "Agregar Doctor" 
 btn.textContent = "Agregar"
  modalDoctor.show();
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
const listarDoctores = () => {
  fetch("http://localhost:3000/medico/mostrarMedicos")
    .then((response) => {
      return response.json();
      
    })
    .then((datos) => {
      console.log(datos)
      datos[0].forEach(element => {
        let fila = `<tr>
        <td>${element.id}</td>
        <td>${element.nombre}</td>
          <td>${element.apellido}</td>
          <td>${element.email} </td>
          <td>${element.especialidad} </td>
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
listarDoctores();


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
      fetch("http://localhost:3000/medico/eliminarMedico/"+id, {
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

  
  let idMedico = fila.children[0].innerHTML;
  let nombreMedico = fila.children[1].innerHTML;
  let apellidoMedico = fila.children[2].innerHTML;
  let emailMedico = fila.children[3].innerHTML;
  let especialidadMedico = fila.children[4].innerHTML;

 

 idDoctor.value = idMedico
 nombre.value = nombreMedico
 apellido.value = apellidoMedico
 email.value = emailMedico
 especialidad.value = especialidadMedico
 
 title.textContent = "Editar Doctor" 
 btn.textContent = "Editar"
 

  opcion = "editar";
  modalDoctor.show();
  
  
});


const actualizar = () => {
  
  
    fetch(
      "http://localhost:3000/medico/editarMedico/" +
        idDoctor.value +
        "/" +
        nombre.value +
        "/" +
        apellido.value +
        "/" +
        email.value +
        "/" +
        especialidad.value +
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
              window.location.href = "doctores.html";
            }
          });
        }
      });

  }


// GUARDAR EL FORMULARIO

formDoctor.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {

        fetch("http://localhost:3000/medico/crearMedico/" +
            nombre.value +
            "/" +
            apellido.value +
            "/" +
            email.value +
            "/" +
            especialidad.value+
           
            "",
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
                  window.location.href = "doctores.html";
                }
              });
            }
          });
 
  }

  if (opcion == "editar") {
    actualizar();
  }
  modalDoctor.hide();
});

