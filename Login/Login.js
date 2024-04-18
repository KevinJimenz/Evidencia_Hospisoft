let btnRegister = document.getElementById('btnRegister')
btnRegister.addEventListener('click',()=>{
    window.location.href = "../Register/Register.html"
})

let email = document.getElementById('email')
let password = document.getElementById('password')

const login = ()=>{


fetch("http://localhost:3000/usuario/MostrarUsuario/"+email.value+"/"+password.value)
.then((res)=>res.json())
.then((res)=>{

    if(Object.keys(res).length === 0){

        fetch("http://localhost:3000/paciente/MostrarPacientes/"+email.value+"/"+password.value)
        .then((rpta)=>rpta.json())
        .then((rpta)=>{
            if(Object.keys(rpta).length === 0){
                
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Alguno de los campos son incorrectos!!",
        footer: ''
      });


            }
            else{

                window.location.href = "../Vista_Paciente/index.html"

            }

        })

    }
    else{

        window.location.href = "../DashBoard/main/main.html"

    }



})



}
