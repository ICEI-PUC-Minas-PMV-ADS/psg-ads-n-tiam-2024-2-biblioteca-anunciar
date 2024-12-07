const { Router } = require("express");
const livroRoutes = require("./Routes/LivroRoutes");
const favoriteRoutes = require("./Routes/favoriteRoutes");

const express = require('express');
const router = express.Router();



router.use("/livros", livroRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
