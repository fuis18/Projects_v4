const { Router } = require("express");
const path = require("path");

const router = Router();

router.get("/", (req, res) => {
  res.sendFile("./pages.json", {
    root: path.join(__dirname, "../data"),
  });
});

router.get("/news", (req, res) => {
  res.sendFile("./news.json", {
    root: path.join(__dirname, "../data"),
  });
});

router.get("/config", (req, res) => {
  res.sendFile("./config.json", {
    root: path.join(__dirname, "../data"),
  });
});

module.exports = router;