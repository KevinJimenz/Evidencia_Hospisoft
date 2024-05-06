let tbody = document.getElementById('tbody');
let btnCrear = document.getElementById('btnCrear');
let idMedicamento = document.getElementById('idMedicamento');
let des = document.getElementById('des');
let stock = document.getElementById('stock');
let formMedicamento = document.getElementById('formMedicamento');
let title = document.getElementById('exampleModalLabel');
let btn = document.getElementById('btn');

const formData = new FormData();


const modalMedicamento = new bootstrap.Modal(
  document.getElementById("exampleModal"),
);
var opcion = "";


const cerrarModal = () =>{
  modalMedicamento.hide();
}

btnCrear.addEventListener("click", () => {

  idMedicamento.value = "";
  des.value = "";
  stock.value = "";
  
  title.textContent = "Agregar Medicamento" 
 btn.textContent = "Agregar"
  modalMedicamento.show();
  opcion = "crear";
});

// evento requerido para seleccionar valores de una fila de tabla

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//PROCEDIMIENTO LISTAR TODOS LOS REGISTROS
const listarMedicamentos = () => {
  fetch("http://localhost:3000/medicamentos/listar")
    .then((response) => {
      return response.json();
      
    })
    .then((datos) => {
      console.log(datos)
      datos[0].forEach(element => {
        let fila = `<tr>
        <td>${element.id}</td>
        <td>${element.descripcion}</td>
          <td>${element.stock}</td>
          <td class="text-center"><button class="btnEditar btn btn-primary btn-sm">Editar</button></td>
          <td class="text-center"><button class="btnBorrar btn btn-danger btn-sm">Borrar</button></td>
          </tr>`;
        tbody.innerHTML += fila;
      });
      
    })
    .catch((error) =>{
      Swal.fire({
        icon: "error",
        title: "No es posible conectarse a la API",
        text: error,
      });
    })
    
};
listarMedicamentos();


on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML;
  let id = fila.children[0].innerHTML;
  console.log(id)
  Swal.fire({
    title: "Seguro que desea borrar el Id: "+id+" ? " ,
     text: "Se borrara de la base de datos !!!", 
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro !",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://localhost:3000/medicamentos/eliminar/"+id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => location.reload());
    }
  });
});

//PROCEDIMIENTO EDITAR
on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode;
  //const id = fila.firstElementChild.innerHTML; //otra forma deinvocar el valor de la fila
  //valores de la fila

  
  let id = fila.children[0].innerHTML;
  let descripcion = fila.children[1].innerHTML;
  let stockMed = fila.children[2].innerHTML;
  

 

 idMedicamento.value = id
 des.value = descripcion
 stock.value = stockMed
 
 
 title.textContent = "Editar Medicamento" 
 btn.textContent = "Editar"
 

  opcion = "editar";
  modalMedicamento.show();
  
  
});


const actualizar = () => {
  
  
    fetch(
      "http://localhost:3000/medicamentos/editar/" +
        idMedicamento.value +
        "/" +
        des.value +
        "/" +
        stock.value +
       
        "" , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
    )
      .then((res) => res.json())
      .then((res) => {
        if (Object.keys(res).length === 0) {
        } else {
          Swal.fire({
            title: res.message,

            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "medicamentos.html";
            }
          });
        }
      });

  }


// GUARDAR EL FORMULARIO

formMedicamento.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {

        fetch("http://localhost:3000/medicamentos/crear/"+des.value+"/"+stock.value+"",
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
                  window.location.href = "medicamentos.html";
                }
              });
            }
          });
 
  }

  if (opcion == "editar") {
    actualizar();
  }
  modalMedicamento.hide();
});

