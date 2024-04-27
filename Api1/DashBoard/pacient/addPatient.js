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
let UsuarioElegido ;
fetch(`http://localhost:3000/usuario/MostrarUsuarios`)
.then((response)=>{
    return response.json()
})
.then((response)=>{
let user =  document.getElementById('user')
var option ;
user.addEventListener('change', function(){
   option = user.options[user.selectedIndex]
  UsuarioElegido = option.value
})
response.forEach(row => {
    let option =`<option value="${row.idUser}">${row.userName}</option>`
    user.innerHTML += option
});
})
let btnAgregar =  document.getElementById('btnAgregar')
btnAgregar.addEventListener('click', ()=>{
    let name = document.getElementById('name').value
    let apellido = document.getElementById('lastname').value
    let email = document.getElementById('email').value
    let telefono = document.getElementById('telefono').value
    let movil = document.getElementById('movil').value
    let date = document.getElementById('date').value
    let eps = document.getElementById('eps').value
    let pass = document.getElementById('pass').value
    let idUsuario = UsuarioElegido
    fetch(`http://localhost:3000/paciente/crearPaciente/${name}/${apellido}/${email}/${telefono}/${movil}/${date}/${eps}/${idUsuario}/${pass}`)
})
