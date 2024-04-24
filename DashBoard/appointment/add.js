
let selectPerson = document.getElementById("person")
let selectDoctor = document.getElementById("doctor")
let descripcion = document.getElementById("des")
let direccion = document.getElementById("direction")
let fecha =  document.getElementById("date")
let horaInicio = document.getElementById("horaInicio")
let btn =  document.getElementById("btn")


btn.addEventListener("click" , () =>{

    
    let horaRecibida = horaInicio.value
    let horaDate = new Date('01/01/2000 ' + horaRecibida);
    horaDate.setHours(horaDate.getHours() + 1);
    let HoraFin =  horaDate.toTimeString().split(' ')[0];
    let fechaRecibida = fecha.value

    fetch("http://localhost:3000/citas/verificarCita/"+horaRecibida+"/"+HoraFin+"/"+fechaRecibida+"")
    .then((res)=>res.json())
    .then((res)=>{

        if(Object.keys(res).length === 0){

            
           
                let descripcions = descripcion.value
                let direccions = direccion.value
                let  fechas= fechaRecibida
                let   horaInicios = horaRecibida
                let    horaFins = HoraFin
                let   idPaciente = selectPerson.value
                let  idMedico= selectDoctor.value
              
              fetch("http://localhost:3000/citas/crearCita/"+descripcions+"/"+direccions+"/"+fechas+"/"+idPaciente+"/"+idMedico+"/"+horaInicios+"/"+horaFins+"",{method: "POST",
              headers: {
                'Content-Type': 'application/json'
              }})
              .then((res)=>res.json())
              .then((res)=>{
                console.log(res)

                if(Object.keys(res).length === 0){

                   
                }
                else{
                    Swal.fire({
                        title: res.message,
            
                        confirmButtonText: "OK",
                       
                      }).then((result) => {
                       
                        if (result.isConfirmed) {
                        
                          window.location.href = "table.html";
            
                        }
                        })
                   

                }


              })


            
             
            



        }
        else{

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ya existe una cita agendada !!",
                footer: ''
              });
        }

    })

})






fetch("http://localhost:3000/paciente/mostrarPacientes")
.then((res)=>res.json())
.then((res)=>{
 console.log(res)
    res.map((item)=>{

        const optionPerson = document.createElement('option')
        optionPerson.value = item.idPaciente
        optionPerson.textContent = item.nombrePaciente
        selectPerson.appendChild(optionPerson)


    })

})

fetch("http://localhost:3000/medico/mostrarMedicos")
.then((res)=>res.json())
.then((res)=>{
 console.log(res)
    res.map((item)=>{

        const optionMedico = document.createElement('option')
        optionMedico.value = item.id
        optionMedico.textContent = item.nombre
        
        selectDoctor.appendChild(optionMedico)


    })

})
