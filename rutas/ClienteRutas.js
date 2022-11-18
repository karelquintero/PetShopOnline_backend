const ClienteOperaciones = require("../operaciones/ClienteOperaciones");
const router = require('express').Router();

router.get("/", ClienteOperaciones.getClientes);
router.get("/:id", ClienteOperaciones.getCliente);
router.post("/", ClienteOperaciones.guardarCliente);
router.put("/:id", ClienteOperaciones.modificarCliente);
router.delete("/:id", ClienteOperaciones.borrarCliente);

module.exports = router