import { connection } from "../models/data";

export const listarMedicamentos = async (req, res) => {
  let sql = "Call listarMedicamentos"
  let [filas] = await connection.query(sql);
  if (!filas) {
    return res.send({
      status: "error",
      mensaje: "No hay registros",
    });
  }
  return res.send({
    status: "ok",
    data: filas,
  });
}; // ? listo
export const eliminarMedicamento = async (req, res) => {
  try{
  let id = req.params.id;
  let sql = "Call eliminarMedicamento(?)";
  await connection.query(sql, [id]);
  return res.send({ status: "Ok", message: "Medicamento eliminado" }); 
  }
  catch(error){
return res.send({ status: "error", message: "Error al eliminar medicamento" }); 

  }

};// ? listo

export const editarMedicamento = async (req, res) => {
  try {
    let descripcion = req.params.descripcion;
    let existencia = req.params.existencia;
    let sql = "Call editarMedicamento(?,?,?)";
    await connection.query(sql, [id, descripcion, existencia]);
    return res.send({ status: "Ok", message: "Medicamento editado" }); 
  } catch (error) {
    return res.send({
      status: "error",
      message: "Error al editar medicamento",
    }); 
  }
 
};//  ? listo

export const crearMedicamento = async (req, res) => {
  try {
    let descripcion = req.params.descripcion;
    let sql = "Call crearMedicamento(?)";
    await connection.query(sql, [descripcion]);
    return res.send({ status: "Ok", message: "Medicamento Creado" }); 
  } catch (error) {
      return res.send({
        status: "error",
        message: "Error al crear medicamento",
      }); 
  }
  
 
};// ? listo
