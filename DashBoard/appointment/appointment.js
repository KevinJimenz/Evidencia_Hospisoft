(() => {
    'use strict'
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })()

  new DataTable( '#tabla', {
  
} );
  
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


let tbdoy = document.getElementById('datos')

fetch("")
