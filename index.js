const express = require('express');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;


//microservicio usuario para gestion

app.use("/", require("./modulos/usuario"))
app.use("/", require("./modulos/paciente"))
app.use("/", require("./modulos/medico"))
app.use("/", require("./modulos/medicamento"))
app.use("/", require("./modulos/citas"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

