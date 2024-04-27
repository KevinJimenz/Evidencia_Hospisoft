(() => {
  "use strict";
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();
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

/**
 * *Add Doctor
 */
// ? Capturo datos
let btnAgregar = document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', ()=>{

    // ? Verifico si ya existe 
    fetch(`http://localhost:3000/medico/buscar/correo`)
    .then((res) => {
      return res.json()
    })
    .then((res) => { 
      let correo = document.getElementById('email').value
      let array = []
      let contador = 0
      res.forEach((row)=>{
        array.push(row)
      })
      array.forEach(row =>{
        if(row.emailMedico == correo){
          contador = contador +1 
        }
      })
      if(contador == 1 )
      {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya existe un medico registrado con este correo !!",
          footer: "",
        });
      }else{
        let nombreMedico = document.getElementById('name').value
        let apellidoMedico = document.getElementById('lastname').value
        let especialidad = document.getElementById('espe').value
        fetch(`http://localhost:3000/medico/crearMedico/${nombreMedico}/${apellidoMedico}/${correo}/${especialidad}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (Object.keys(res).length === 0) {
          } else {
            Swal.fire({
              title: res.message,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "tabla.html";
              }
            });
          }
        });
      }
    })
  })
