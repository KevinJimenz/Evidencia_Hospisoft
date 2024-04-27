(() => {
  "use strict";
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();
/**
 * *Contenido de los CRUD
 */
// ? dates
$(document).ready(function () {
  $(".dates").click(function () {
    $(this).toggleClass("active");
    var content = $(this).next(".content_dates");
    content.slideToggle(300);
  });
});
// ? Doctors
$(document).ready(function () {
  $(".doctors").click(function () {
    $(this).toggleClass("active");
    var content = $(this).next(".content_doctors");
    content.slideToggle(300);
  });
});
// ? Medicine
$(document).ready(function () {
  $(".medicine").click(function () {
    $(this).toggleClass("active");
    var content = $(this).next(".content_medicine");
    content.slideToggle(300);
  });
});
// ? Patient
$(document).ready(function () {
  $(".patient").click(function () {
    $(this).toggleClass("active");
    var content = $(this).next(".content_patient");
    content.slideToggle(300);
  });
});
var tabla = new DataTable("#tabla", {});
var elementoVisible = true;
let toggle = document.getElementById("sidebarToggle");
toggle.addEventListener("click", () => {
  let title = document.getElementById("title");
  if (elementoVisible) {
    // Si el elemento está visible, ocultarlo
    title.style.visibility = "hidden";
  } else {
    // Si el elemento está oculto, mostrarlo
    title.style.visibility = "visible";
  }

  // Invertir el estado de visibilidad para la próxima vez que se haga clic
  elementoVisible = !elementoVisible;
});

// ? Cargo las citas en la tabla
fetch("http://localhost:3000/citas/mostrarCitas")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    tabla.clear().draw();
    response.forEach((row) => {
      tabla.row
        .add([
          row.idCita,
          row.descripcion,
          row.direccion,
          row.fecha,
          row.horaInicio,
          row.horaFin,
          row.nombrePaciente,
          row.nombreMedico,
          `<button type="button" id="btnEditar"  class="bi bi-pencil btn btn-primary"></button>`,
          `<button type="button" id="btnEliminar" class="bi bi-trash btn btn-danger"></button>`,
        ])
        .draw();
    });
    let selectPaciente = document.getElementById("selecPaciente");
    let selectMedico = document.getElementById("selecMedico");
    response.map((item) => {
      let fechaVieja = item.fecha;
      let fechaNueva = new Date(fechaVieja);
      let fechaUtil = fechaNueva.toISOString().slice(0, 10);
      item.fecha = fechaUtil;
      const optionPaciente = document.createElement("option");
      optionPaciente.value = item.idPaciente;
      optionPaciente.textContent = item.nombrePaciente;
      selectPaciente.appendChild(optionPaciente);
      const optionMedico = document.createElement("option");
      optionMedico.value = item.idMedico;
      optionMedico.textContent = item.nombreMedico;
      selectMedico.appendChild(optionMedico);
    });
  });
let form = document.getElementById("form");
// ? boton Editar de la tabla
$("#tabla tbody").on("click", "#btnEditar", function () {
  // Obtener la fila correspondiente a este botón
  var fila = $(this).closest("tr");
  // Obtener los datos de la fila
  var data = tabla.row(fila).data();
  capturoDatos(
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7]
  );
  form.style.visibility = "visible";
});
// ? Funcion que captura los datos de la fila seleccionada
// ? y los pinta en el formulario
function capturoDatos(
  id,
  descripcion,
  direccion,
  fecha,
  horaInicio,
  horaFin,
  paciente,
  medico
) {
  document.getElementById("id").value = id;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("descripcionForm").value = descripcion;
  document.getElementById("direccion").value = direccion;
  document.getElementById("direccionForm").value = direccion;
  document.getElementById("fecha").value = fecha;
  document.getElementById("fechaForm").value = fecha;
  document.getElementById("horaInicio").value = horaInicio;
  document.getElementById("horaInicioForm").value = horaInicio;
  document.getElementById("horaFin").value = horaFin;
  document.getElementById("pacienteInput").value = paciente;
  document.getElementById("medicoInput").value = medico;
  document.getElementById("selecPaciente").append(paciente);
  document.getElementById("selecMedico").append(medico);
}
// ? boton Eliminar de la tabla
$("#tabla tbody").on("click", "#btnEliminar", function () {
  // Obtener la fila correspondiente a este botón
  var fila = $(this).closest("tr");
  // Elimina de la base de datos
  // Obtener los datos de la fila
  var data = tabla.row(fila).data();
  let idCita = data[0];
  fetch(`http://localhost:3000/cita/eliminarCita/${idCita}`);
  // Eliminar la fila de la tabla
  tabla.row(fila).remove().draw();
});

let btnEditarDoctor = document.getElementById("btnEditarDoctor");
btnEditarDoctor.addEventListener("click", () => {
  let id = document.getElementById("id").value;
  let descripcion = document.getElementById("descripcionForm").value;
  let direccion = document.getElementById("direccionForm").value;
  let fechaActual = document.getElementById("fechaForm").value;
  let horaInicioActual = document.getElementById("horaInicioForm").value;
  let idPaciente = document.getElementById("selecPaciente").value;
  let idMedico = document.getElementById("selecMedico").value;
  let fechaVieja = document.getElementById("fecha").value;
  let horaInicioVieja = document.getElementById("horaInicio").value;

  if (horaInicioActual == horaInicioVieja && fechaVieja == fechaActual) {
    let horaRecibida = horaInicioActual;
    let horaDate = new Date("01/01/2000 " + horaRecibida);
    horaDate.setHours(horaDate.getHours() + 1);
    let horaFin = horaDate.toTimeString().split(" ")[0];
    console.log(horaFin);
    fetch(
      "http://localhost:3000/citas/editarCitas/" +
        id +
        "/" +
        descripcion +
        "/" +
        direccion +
        "/" +
        fechaActual +
        "/" +
        idPaciente +
        "/" +
        idMedico +
        "/" +
        horaInicioActual +
        "/" +
        horaFin +
        ""
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
              window.location.href = "table.html";
            }
          });
        }
      });
  } else {
    let horaRecibida = horaInicioActual;
    let horaDate = new Date("01/01/2000 " + horaRecibida);
    horaDate.setHours(horaDate.getHours() + 1);
    let horaFin = horaDate.toTimeString().split(" ")[0];
    console.log(horaFin);

    fetch(
      "http://localhost:3000/citas/verificarCita/" +
        horaInicioActual +
        "/" +
        horaFin +
        "/" +
        fechaActual +
        ""
    )
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length === 0) {
          fetch(
            "http://localhost:3000/citas/editarCitas/" +
              id +
              "/" +
              descripcion +
              "/" +
              direccion +
              "/" +
              fechaActual +
              "/" +
              idPaciente +
              "/" +
              idMedico +
              "/" +
              horaInicioActual +
              "/" +
              horaFin +
              ""
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
                    window.location.href = "table.html";
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
});


