
let btnLogin = document.getElementById('btnLogin')
btnLogin.addEventListener('click',()=>{
    window.location.href = "../Login/Login.html"
})


let id = document.getElementById('id')
let nombre = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')

console.log(id)



const registro = () => { 

if(id.value.length == 0 || nombre.value.length == 0 || email.value.length == 0 || password.value.length == 0){

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa los campos !!",
        footer: ''
      });

}
else{

  const datos = {
    idUser: id.value,
    userName: nombre.value,
    emailUser: email.value,
    password: password.value
  }

  fetch("http://localhost:3000/usuario/crearUsuario",{method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
body: JSON.stringify(datos)})
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res);
            Swal.fire({
            title: res.message,

            confirmButtonText: "OK",
           
          }).then((result) => {
           
            if (result.isConfirmed) {
            
              window.location.href = "../Login/Login.html";

            }
            })
        


    })



}

};

