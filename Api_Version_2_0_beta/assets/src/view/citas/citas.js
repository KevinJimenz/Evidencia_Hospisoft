let tbody = document.getElementById('tbody');
let btnCrear = document.getElementById('btnCrear');
let idCita = document.getElementById('idCita');
let des = document.getElementById('des');
let direction = document.getElementById('direction');
let date = document.getElementById('date');
let horaInicio = document.getElementById('horaInicio');
let selectPerson = document.getElementById('person');
let selectDoctor = document.getElementById('doctor');
let formCita = document.getElementById('formCita');
let title = document.getElementById('exampleModalLabel');
let btn = document.getElementById('btn');
let fechaVieja = document.getElementById('fechaVieja');
let horaVieja = document.getElementById('horaVieja');
const formData = new FormData();


const modalCita = new bootstrap.Modal(
  document.getElementById("exampleModal"),
);
var opcion = "";


const cerrarModal = () =>{
  modalCita.hide();
}

btnCrear.addEventListener("click", () => {
  selectDoctor.innerHTML = '';
  selectPerson.innerHTML = '';
  fetch("http://localhost:3000/pacientes/listar")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res[0].map((item) => {
      console.log(res)
      const optionPerson = document.createElement("option");
      optionPerson.value = item.idPaciente;
      optionPerson.textContent = item.nombrePaciente;
      selectPerson.appendChild(optionPerson);
    });
  });
  fetch("http://localhost:3000/medico/mostrarMedicos")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res[0].map((item) => {
      const optionMedico = document.createElement("option");
      optionMedico.value = item.id;
      optionMedico.textContent = item.nombre;
      selectDoctor.appendChild(optionMedico);
    });
  });
  idCita.value = "";
  des.value = "";
  direction.value = "";
  date.value = "";
  horaInicio.value = "";
  title.textContent = "Agregar Cita" 
  
 btn.textContent = "Agregar"
  modalCita.show();
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
const listarCitas = () => {
  fetch("http://localhost:3000/citas/mostrarCitas")
    .then((response) => {
      return response.json();
      
    })
    .then((datos) => {
      console.log(datos)
      datos[0].forEach(element => {
        console.log(element)
        let fecha = element.fecha.slice(0,10)
        let fila = `<tr>
        <td>${element.idCita}</td>
        <td>${element.descripcion}</td>
          <td>${element.direccion}</td>
          <td>${fecha}</td> 
          <td>${element.horaInicio} </td>
          <td>${element.horaFin} </td>
          <td>${element.nombrePaciente} </td>
          <td>${element.nombreMedico} </td>
          <td hidden>${element.idMedico}</td>
          <td hidden>${element.idPaciente}</td>
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
listarCitas();


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
      fetch("http://localhost:3000/citas/eliminarCita/"+id, {
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

  console.log(fila.children[4].innerHTML)
  let idCitaTable = fila.children[0].innerHTML;
  let descripcionCita = fila.children[1].innerHTML;
  let direccionCita = fila.children[2].innerHTML;
  let fechaCita = fila.children[3].innerHTML;
  let horaInicioTable = fila.children[4].innerHTML;
  selectDoctor.innerHTML = '';
  selectPerson.innerHTML = '';
  fetch("http://localhost:3000/pacientes/listar")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res[0].map((item) => {
      console.log(res)
      const optionPerson = document.createElement("option");
      optionPerson.value = item.idPaciente;
      optionPerson.textContent = item.nombrePaciente;
      selectPerson.appendChild(optionPerson);
    });
  });
  fetch("http://localhost:3000/medico/mostrarMedicos")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res[0].map((item) => {
      const optionMedico = document.createElement("option");
      optionMedico.value = item.id;
      optionMedico.textContent = item.nombre;
      selectDoctor.appendChild(optionMedico);
    });
  });


 idCita.value = idCitaTable
 des.value = descripcionCita
 direction.value = direccionCita
 date.value = fechaCita
 fechaVieja.value = fechaCita
 horaVieja.value = horaInicioTable.slice(0,5)
 horaInicio.value = horaInicioTable.slice(0,5)
 title.textContent = "Editar Cita" 
 btn.textContent = "Editar"
 


  opcion = "editar";
  modalCita.show();
  
  
});


const actualizar = () => {
  
  

  let horaRecibida = horaInicio.value;
  let horaDate = new Date("01/01/2000 " + horaRecibida);
  horaDate.setHours(horaDate.getHours() + 1);
  let horaFin = horaDate.toTimeString().split(" ")[0];
  let fechaRecibida = date.value;
  
  if (horaRecibida == horaVieja.value && fechaVieja.value == fechaRecibida) {
    
    fetch(
      "http://localhost:3000/citas/editarCita/" +
        idCita.value +
        "/" +
        des.value +
        "/" +
        direction.value +
        "/" +
        date.value +
        "/" +
        selectPerson.value +
        "/" +
        selectDoctor.value +
        "/" +
        horaInicio.value +
        "/" +
        horaFin +
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
              window.location.href = "citas.html";
            }
          });
        }
      });

  }
  else{

    fetch(
      "http://localhost:3000/citas/verificarCita/" +
        horaInicio.value +
        "/" +
        horaFin +
        "/" +
        date.value +
        ""
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "No hay citas registradas") {
          fetch("http://localhost:3000/citas/editarCita/" +idCita.value +"/" +
              des.value+
              "/" +
              direction.value +
              "/" +
              date.value +
              "/" +
              selectPerson.value +
              "/" +
              selectDoctor.value +
              "/" +
              horaInicio.value +
              "/" +
              horaFin +
              "", {
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
                    window.location.href = "citas.html";
                  }
                });
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ya existe una cita agendada !!",
            footer: "",
          });
        }
      });


  }
  
   


  
}

/**/ 
// GUARDAR EL FORMULARIO

formCita.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {

    let horaRecibida = horaInicio.value;
    let horaDate = new Date("01/01/2000 " + horaRecibida);
    horaDate.setHours(horaDate.getHours() + 1);
    let HoraFin = horaDate.toTimeString().split(" ")[0];
    let fechaRecibida = date.value;

    
  fetch(
    "http://localhost:3000/citas/verificarCita/" +
      horaRecibida +
      "/" +
      HoraFin +
      "/" +
      fechaRecibida +
      ""
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      if (res.message == "No hay citas registradas") {
        let descripcions = des.value;
        let direccions = direction.value;
        let fechas = fechaRecibida;
        let horaInicios = horaRecibida;
        let horaFins = HoraFin;
        let idPaciente = selectPerson.value;
        let idMedico = selectDoctor.value;

        fetch("http://localhost:3000/citas/crearCita/" +
            descripcions +
            "/" +
            direccions +
            "/" +
            fechas +
            "/" +
            idPaciente +
            "/" +
            idMedico +
            "/" +
            horaInicios +
            "/" +
            horaFins +
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
                  window.location.href = "citas.html";
                }
              });
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya existe una cita agendada !!",
          footer: "",
        });
      }
    });

 
  }

  if (opcion == "editar") {
    actualizar();
  }
  modalCita.hide();
});
