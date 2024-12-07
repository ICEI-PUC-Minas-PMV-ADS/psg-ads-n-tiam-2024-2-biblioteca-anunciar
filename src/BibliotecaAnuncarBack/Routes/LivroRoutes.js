const { Router } = require("express")
const { getLivros, postLivros, getLivro, deleteLivro, putLivro, reservarLivro, alternarFavorito, buscarFavoritos } = require("../Controller/LivroController")

const router = Router();

router.get("/", getLivros);

router.get("/:id", getLivro);

router.post("/", postLivros);

router.put("/:id", putLivro);

router.delete("/:id", deleteLivro);

router.put("/:id/reservar", reservarLivro);

router.put("/users/:userId/favoritos/:livroId", alternarFavorito);

router.get("/users/:userId", buscarFavoritos);

module.exports = router;