let cedula = document.getElementById("cedula");
let nombres = document.getElementById("nombres");
let apellidos = document.getElementById("apellidos");
let gmail = document.getElementById("gmail");
let btnConsultar = document.getElementById("btnConsultar");
let contenedorTable = document.getElementById("contenedorTable");
let db = window.localStorage;
let cont = 0;
const numActivateBtn = () => {
  let llave = Object.keys(db);
  let idAntes = 0;
  let idAnterior = JSON.parse(db.getItem(llave[0]));
  if (idAnterior == null) {
    console.log(idAnterior);
    idAntes = cedula.id;
  } else {
    idAntes = idAnterior.id;
  }
  if (cont == 0 || cedula.value != idAntes) {
    buscarCita();
  } 
};
const buscarCita = () => {
  if (
    cedula.value == "" ||
    nombres.value == "" ||
    apellidos.value == "" ||
    gmail.value == ""
  ) {
    Swal.fire({
      title: "Oops!",
      text: "Debes de ingresar datos en los campos faltantes",
      icon: "error",
    });
  } else {
    fetch("http://localhost:3000/cita/mostrarPacienteId/" + cedula.value)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let ids = {
          id: cedula.value,
        };

        db.setItem("idActual", JSON.stringify(ids));
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
    </table>`;
        contenedorTable.innerHTML = tabla;

        if (cont > 0) {
          contenedorTable.innerHTML = "";

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
     </table>`;
          contenedorTable.innerHTML += tabla;
        }
        
        res.forEach(row => {
          let fila =
           `<tr>
              <td>${row[0].descripcion}</td>
              <td>${row[0].fecha}</td>
              <td>${row[0].id_Paciente}</td>
              <td>${row[0].nombrePaciente}</td>
              <td>${row[0].apellidoPaciente}</td>
              <td>${row[0].emailPaciente}</td>
              <td>${row[0].telefonoPaciente}</td>
              <td>${row[0].fechaNacimiento}</td>
              <td>${row[0].epsPaciente}</td>
              <td>${row[0].nombreMedico}</td>
              <td>${row[0].apellidoMedico}</td>
              <td>${row[0].emailMedico}</td>
              <td>${row[0].especialidad}</td>
            </tr>`; 
          tbody.innerHTML += fila;
        });
        cont++;
      });
  }
};
