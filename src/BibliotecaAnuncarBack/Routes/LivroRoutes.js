const { Router } = require("express")
const { getLivros, postLivros, getLivro, deleteLivro, putLivro } = require("../Controller/LivroController")

const router = Router();

router.get("/", getLivros);

router.get(`/:id`, getLivro);

router.post("/" , postLivros);

router.put("/:id", putLivro);

router.delete("/:id", deleteLivro); 

module.exports = router;