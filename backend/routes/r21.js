const { Router } = require("express");
// const path = require("path");

const router = Router();

// const FILE_PATH = path.join(__dirname, "../data/r21.json");

let DB_DATA = [
	{
		enabled: true,
		pedidos: [
			{ pedido: "", enabled: true, complete: false },
			{ pedido: "", enabled: false, complete: false },
		],
	},
	{
		enabled: false,
		pedidos: [
			{ pedido: "", enabled: true, complete: false },
			{ pedido: "", enabled: false, complete: false },
		],
	},
];

router.get("/pages/r21", (req, res) => {
	res.json(DB_DATA);
});

// Agregar un nuevo registro
router.post("/pages/r21", (req, res) => {
	console.log("Datos recibidos:", req.body);

	// Validar que realmente recibimos un array (tu frontend siempre envía un array)
	if (!Array.isArray(req.body)) {
		return res.status(400).json({ error: "El body debe ser un array" });
	}

	// 🟢 Sobrescribir tal cual
	DB_DATA = req.body;

	res.json({ message: DB_DATA });
});

module.exports = router;
