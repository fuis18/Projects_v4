const { Router } = require("express");
const path = require("path");

const router = Router();

router.get("/pages/r6", (req, res) => {
  res.sendFile("./train.json", {
      root: path.join(__dirname, "../data"),
    });
});

module.exports = router;
