// routes/favoriteRoutes.js
const { Router } = require("express");
const { getFavorites, addFavorite, removeFavorite } = require("../Controller/FavoriteController");

const router = Router();

router.get("/", getFavorites);
router.post("/", addFavorite);
router.delete("/:id", removeFavorite);

module.exports = router;
