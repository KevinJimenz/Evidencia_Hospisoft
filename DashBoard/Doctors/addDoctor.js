  /**
 * *Contenido de los CRUD
 */
// ? dates
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
