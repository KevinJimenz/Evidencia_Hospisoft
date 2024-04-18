let cedula = document.getElementById("cedula");
let nombres = document.getElementById("nombres");
let apellidos = document.getElementById("apellidos");
let gmail = document.getElementById("gmail");
let btnConsultar = document.getElementById("btnConsultar");
let contenedorTable = document.getElementById("contenedorTable");
let db = window.localStorage;

let cont = 0;

const numActivateBtn = ()=>{
  let llave = Object.keys(db)
  console.log(llave);
  let idAntes=0;
  
  let idAnterior = JSON.parse(db.getItem(llave[0]))
  if(idAnterior==null){
    console.log(idAnterior)
    idAntes = cedula.id;
  }
  else{
    idAntes = idAnterior.id;

  }
  
  
  if(cont==0 || cedula.value != idAntes){

  buscarCita();


  }
  else{

  }

}
const buscarCita = ()=>{

  

  if(cedula.value=="" || nombres.value=="" || apellidos.value=="" || gmail.value==""){
      Swal.fire({
        title: "Oops!",
        text: "Debes de ingresar datos en los campos faltantes",
        icon: "error"
      });
  
  }else{
  
   
    fetch("http://localhost:3000/citas/mostrarPacienteId/"+cedula.value)
    .then((res)=>res.json())
    .then((res)=>{
    console.log(res);
    let ids ={
      id:cedula.value
    }
   

    db.setItem("idActual",JSON.stringify(ids));
    let tabla = `
    <table id="tablex" class="table table-responsive table-bordered">
    <thead id="thead" class="thead-dark">
      <tr>
      
    
        <th scope="col">Descripcion</th>
        <th scope="col">Fecha</th>
        <th scope="col">IdPaciente</th>
        <th scope="col">Nombres</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>
        <th scope="col">Fecha Nacimiento</th>
        <th scope="col">EPS</th>
        <th scope="col">Nombre Medico</th>
        <th scope="col">Apellido Medico</th>
        <th scope="col">Email</th>
        <th scope="col">Especialidad</th>
        
      </tr>
    </thead>
    <tbody id="tbody">
    
    
    </tbody>
    </table>`
    contenedorTable.innerHTML+= tabla;
    
    if(cont>0){
     contenedorTable.innerHTML = '';

     let tabla = `
     <table id="tablex" class="table table-responsive table-bordered">
     <thead id="thead" class="thead-dark">
       <tr>
       
     
         <th scope="col">Descripcion</th>
         <th scope="col">Fecha</th>
         <th scope="col">IdPaciente</th>
         <th scope="col">Nombres</th>
         <th scope="col">Apellidos</th>
         <th scope="col">Email</th>
         <th scope="col">Telefono</th>
         <th scope="col">Fecha Nacimiento</th>
         <th scope="col">EPS</th>
         <th scope="col">Nombre Medico</th>
         <th scope="col">Apellido Medico</th>
         <th scope="col">Email</th>
         <th scope="col">Especialidad</th>
         
       </tr>
     </thead>
     <tbody id="tbody">
     
     
     </tbody>
     </table>`
     contenedorTable.innerHTML+= tabla;
    }
    
    res.map((element)=>{
    
    let fila = `<tr><td>${element.descripcion}</td><td>${element.fecha}</td><td>${element.id_Paciente}</td>
    <td>${element.nombrePaciente}</td><td>${element.apellidoPaciente}</td><td>${element.emailPaciente}</td>
    <td>${element.telefonoPaciente}</td><td>${element.fechaNacimiento}</td><td>${element.epsPaciente}</td>
    <td>${element.nombreMedico}</td><td>${element.apellidoMedico}</td><td>${element.emailMedico}</td>
    <td>${element.especialidad}</td></tr>`
    tbody.innerHTML += fila
    
    
    
    
    })
  
    cont++;
  
    
    
    })
  }

}


    




