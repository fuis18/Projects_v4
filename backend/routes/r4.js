const { Router } = require("express");
// const path = require("path");

const router = Router();

// const Admission = require(path.join(__dirname, "../data", "./admission.js"));
let Admission = [];

router.get("/pages/r4", (req, res) => {
  res.json(Admission);
});

// Agregar un nuevo registro
router.post("/pages/r4", (req, res) => {
  console.log("Datos recibidos:", req.body);
  const newItem = { ...req.body, id: Admission.length + 1 };
  Admission.push(newItem);
  res.json({ message: Admission });
});


// Enviar la lista por correo y vaciar Admission
router.post("/pages/r4/mail", async (req, res) => {
  if (Admission.length === 0) {
    console.log("Correo enviado con éxito");
    Admission = []; // Limpiar la lista después de enviar
    return res.status(400).json({ error: "No hay datos para enviar" });
  }
});

module.exports = router;
