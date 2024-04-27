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
let selectPerson = document.getElementById("person");
let selectDoctor = document.getElementById("doctor");
let descripcion = document.getElementById("des");
let direccion = document.getElementById("direction");
let fecha = document.getElementById("date");
let horaInicio = document.getElementById("horaInicio");
let btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  let horaRecibida = horaInicio.value;
  let horaDate = new Date("01/01/2000 " + horaRecibida);
  horaDate.setHours(horaDate.getHours() + 1);
  let HoraFin = horaDate.toTimeString().split(" ")[0];
  let fechaRecibida = fecha.value;

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
      if (Object.keys(res).length === 0) {
        let descripcions = descripcion.value;
        let direccions = direccion.value;
        let fechas = fechaRecibida;
        let horaInicios = horaRecibida;
        let horaFins = HoraFin;
        let idPaciente = selectPerson.value;
        let idMedico = selectDoctor.value;

        fetch(
          "http://localhost:3000/citas/crearCita/" +
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
});

fetch("http://localhost:3000/paciente/mostrarPacientes")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res.map((item) => {
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
    res.map((item) => {
      const optionMedico = document.createElement("option");
      optionMedico.value = item.id;
      optionMedico.textContent = item.nombre;
      selectDoctor.appendChild(optionMedico);
    });
  });
