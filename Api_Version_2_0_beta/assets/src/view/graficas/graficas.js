/** 
 * Ocultar Barra lateral y Mostrar
 */
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
// Grafico 1 Datos
  let EneroInicio = new Date("2024-01-01")
  let EneroFin= new Date("2024-01-31")
  let FebreroInicio = new Date("2024-02-01")
  let FebreroFin= new Date("2024-02-31")
  let MarzoInicio = new Date("2024-03-01")
  let MarzoFin= new Date("2024-03-31")
  let AbrilInicio = new Date("2024-04-01")
  let AbrilFin= new Date("2024-04-31")
  let MayoInicio = new Date("2024-05-01")
  let MayoFin= new Date("2024-05-31")
  let JunioInicio = new Date("2024-06-01")
  let JunioFin= new Date("2024-06-31")
  let JulioInicio = new Date("2024-07-01")
  let JulioFin= new Date("2024-07-31")
  let AgostoInicio = new Date("2024-08-01")
  let AgostoFin= new Date("2024-08-31")
  let SeptiembreInicio = new Date("2024-09-01")
  let SeptiembreFin= new Date("2024-09-31")
  let OctubreInicio = new Date("2024-10-01")
  let OctubreFin= new Date("2024-10-31")
  let NoviembreInicio = new Date("2024-11-01")
  let NoviembreFin= new Date("2024-11-31")
  let DiciembreInicio = new Date("2024-12-01")
  let DiciembreFin= new Date("2024-12-31")
  let cont1 = 0;
  let cont2 = 0;
  let cont3 = 0;
  let cont4 = 0;
  let cont5 = 0;
  let cont6 = 0;
  let cont7 = 0;
  let cont8 = 0;
  let cont9 = 0;
  let cont10 = 0;
  let cont11 = 0;
  let cont12 = 0;
  let fechaDB ;
  let fecha ;
  var chart1 ;
  var chart2 ;
  var chart3 ;
  let datosGrafico1 = []
  fetch(`http://localhost:3000/citas/pacientesAtendidos`)
  .then((response)=>{
      return response.json();
  })
  .then((response)=>{
     response.map((value)=>{
      // Capturo la fecha de la base de datos
      fechaDB = value.fecha
      // Escojo 10 caracteres que son: año , mes y dia
      fecha = fechaDB.substring(0,10)
      // Convierto la cadena en fecha
      let nuevaFecha = new Date(fecha)
      // ? Comparo fechas con las que ya tengo en variables 
      switch ( true ) {
        case (nuevaFecha >= EneroInicio && nuevaFecha<= EneroFin):
            cont1++ ;
        break;
        case (nuevaFecha >= FebreroInicio && nuevaFecha<= FebreroFin):
            cont2++ ;
        break;
        case (nuevaFecha >= MarzoInicio && nuevaFecha<= MarzoFin):
            cont3++ ;
            break;
        case (nuevaFecha >= AbrilInicio && nuevaFecha<= AbrilFin):
            cont4++
        break;
        case (nuevaFecha >= MayoInicio && nuevaFecha<= MayoFin):
            cont5++
        break;
        case (nuevaFecha >= JunioInicio && nuevaFecha<= JunioFin):
            cont6++
        break;
        case (nuevaFecha >= JulioInicio && nuevaFecha<= JulioFin):
            cont7++
        break;
        case (nuevaFecha >= AgostoInicio && nuevaFecha<= AgostoFin):
            cont8++
        break;
        case (nuevaFecha >= SeptiembreInicio && nuevaFecha<= SeptiembreFin):
            cont9++
        break;
        case (nuevaFecha >= OctubreInicio && nuevaFecha<= OctubreFin):
            cont10++
        break;
        case (nuevaFecha >= NoviembreInicio && nuevaFecha<= NoviembreFin):
            cont11++
        break;
        case (nuevaFecha >= DiciembreInicio && nuevaFecha<= DiciembreFin):
            cont12++
        break;
      }})
      // ? Valido si los contadores son mayores que 0
      // ? Si no cumple con algun caso el valor por defecto sera 0
      if( cont1 > 0 ) { datosGrafico1.push(cont1) }
      else{ datosGrafico1.push(0) }
      if( cont2 > 0 ) { datosGrafico1.push(cont2) }
      else{ datosGrafico1.push(0) }
      if( cont3 > 0 ) { datosGrafico1.push(cont3) }
      else{ datosGrafico1.push(0) }
      if( cont4 > 0 ) { datosGrafico1.push(cont4) }
      else{ datosGrafico1.push(0) }
      if( cont5 > 0 ) { datosGrafico1.push(cont5) }
      else{ datosGrafico1.push(0) }
      if( cont6 > 0 ) { datosGrafico1.push(cont6) }
      else{ datosGrafico1.push(0) }
      if( cont7 > 0 ) { datosGrafico1.push(cont7) }
      else{ datosGrafico1.push(0) }
      if( cont8 > 0 ) { datosGrafico1.push(cont8) }
      else{ datosGrafico1.push(0) }
      if( cont9 > 0 ) { datosGrafico1.push(cont9) }
      else{ datosGrafico1.push(0) }
      if( cont10 > 0 ) { datosGrafico1.push(cont10) }
      else{ datosGrafico1.push(0) }
      if( cont11 > 0 ) { datosGrafico1.push(cont11) }
      else{ datosGrafico1.push(0) }
      if( cont12 > 0 ) { datosGrafico1.push(cont12) }
      else{ datosGrafico1.push(0) }
  })
  // --------------------------------------------- //

  // Grafico 2 datos
  let contenedorMes = document.getElementById('contenedorMes')
  let valores = []
  let medicos = []
  let selectMes = document.getElementById('selectMeses')
  selectMes.addEventListener('change',function(){
    actulizarGrafica(chart2)
     var mes = selectMes.options[selectMes.selectedIndex]
     fetch(`http://localhost:3000/citas/medicos/pacientesAtendidos/${mes.value}`)
     .then((respnse)=>{
       return respnse.json()
     })
     .then((response)=>{
       response.map((value)=>{
           medicos.push(value.Nombre + " " + value.Apellido)
           valores.push(value.Total_Pacientes)
       })
     }) 
  })
  // --------------------------------------------- //
  var validator = 0;
  var option ;
  // Canvas
  var ctx = document.getElementById('lineChart')
  let select = document.getElementById('select')
  select.addEventListener('change', function() {
    // ? Guardo la opcion que eligio
     option = select.options[select.selectedIndex]
    // ? Valido cual fue la ultima seleccion y la elimino
    // ? Y seteo el valor de la variable para un proxima vuelta
   if( validator == 1 ) { eliminarGrafico(chart1) ; validator = 0 ; }
   if( validator == 2 ) { eliminarGrafico(chart2) ; validator = 0 ; }
   if( validator == 3 ) { eliminarGrafico(chart3) ; validator = 0 ; }
   // ? Pinto las graficas 
   if(option.value == 1 )
     {
        contenedorMes.style.visibility = 'hidden'
        chart1 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Pacientes atendidos por mes',
                    backgroundColor: [
                        'red',
                        'orange',
                        'darkblue',
                        'green',
                        'yellow',
                        'pink',
                        'cyan',
                        'blue',
                        'purple',
                    ],
                    borderColor: 'black',
                    borderWidth: 1,
                    data: [cont1,cont2,cont3,cont4,cont5,cont6,cont7,cont8,cont9,cont10,cont11,cont12]
                }]
            }
        });
        validator = 1
     }
   if(option.value == 2 )
     {
      contenedorMes.style.visibility = 'Visible'
        chart2 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: medicos,
                datasets: [{
                    label: 'Medico con mas pacientes atentidos al mes',
                    backgroundColor: 'cyan',
                    borderColor: 'black',
                    borderWidth: 1,
                    data: valores,
    
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'realtime'
                    }]
                }
            },
            
        });
           // guardo el valor de acuerdo a que grafica se esta mostrando
        validator = 2
     }
   if(option.value == 3)
     {
        contenedorMes.style.visibility = 'hidden'
        chart3 = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                datasets: [{
                    label: 'Facturacion citas mensuales',
                    backgroundColor: [
                        'red',
                        'orange',
                        'darkblue',
                        'green',
                        'yellow',
                        'pink',
                        'cyan',
                        'blue',
                        'purple',
                    ],
                    borderColor: 'black',
                    borderWidth: 1,
                    data:[cont1,cont2,cont3,cont4,cont5,cont6,cont7,cont8,cont9,cont10,cont11,cont12] ,

                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'realtime'
                    }]
                }
            }
        });
           // guardo el valor de acuerdo a que grafica se esta mostrando
        validator = 3
     }
     
 })
/**
 * 
 * Eliminar Grafica
 */
function eliminarGrafico(grafico){
    grafico.destroy()
}
/**
 * Actualizar Grafica
 */
function actulizarGrafica(grafico){
    grafico.data.labels.shift(); // Elimina el nombre mas antiguo
    grafico.data.datasets[0].data.shift(); // Eliminar el valor mas antiguo
    grafico.update() // actualiza la grafica
}
/**
 * Descargar Graficas
 */
let btnDescargar = document.getElementById('descargar')
btnDescargar.addEventListener('click', ()=>{
    var graficaSelect = option.value
    if(graficaSelect == 1)
    {
       const values = [
        {x: chart1.data.labels, y: datosGrafico1}
       ];
       /**
         * Creo un libro de Excel
         */
       const workbook = XLSX.utils.book_new()
        /**
        * Convertir los datos en datos legibles para la libreria
        * SheetJs
        */
        const data = values.map(item => [item.x , item.y])
        /** 
         * Creo un hoja y agrego los datos
         * */
        const worksheet = XLSX.utils.aoa_to_sheet([
            data[0][0],
            data[0][1]
        ])
        /**
         * Agrego la hoja al libro
         */
        XLSX.utils.book_append_sheet(workbook,worksheet,'Datos')
        /**
         * Descargo el libro
         */
        XLSX.writeFile(workbook, 'Datos_Grafico_1.xlsx')
    }
    if(graficaSelect == 2)
    {
        const values = [
            {x: chart2.data.labels, y: valores}
           ];
          
           /**
             * Creo un libro de Excel
             */
           const workbook = XLSX.utils.book_new()
            /**
            * Convertir los datos en datos legibles para la libreria
            * SheetJs
            */
            const data = values.map(item => [item.x , item.y])
            /** 
             * Creo un hoja y agrego los datos
             * */
            const worksheet = XLSX.utils.aoa_to_sheet([
                data[0][0],
                data[0][1]
            ])
            /**
             * Agrego la hoja al libro
             */
            XLSX.utils.book_append_sheet(workbook,worksheet,'Datos')
            /**
             * Descargo el libro
             */
         
            XLSX.writeFile(workbook, 'Datos_Grafico_2.xlsx')
    }
    if(graficaSelect == 3)
    {
        const values = [
            {x: chart3.data.labels, y: datosGrafico1}
           ];
          
           /**
             * Creo un libro de Excel
             */
           const workbook = XLSX.utils.book_new()
            /**
            * Convertir los datos en datos legibles para la libreria
            * SheetJs
            */
            const data = values.map(item => [item.x , item.y])
            /** 
             * Creo un hoja y agrego los datos
             * */
            const worksheet = XLSX.utils.aoa_to_sheet([
                data[0][0],
                data[0][1]
            ])
            /**
             * Agrego la hoja al libro
             */
            XLSX.utils.book_append_sheet(workbook,worksheet,'Datos')
            /**
             * Descargo el libro
             */
         
            XLSX.writeFile(workbook, 'Datos_Grafico_3.xlsx')
    }
})
