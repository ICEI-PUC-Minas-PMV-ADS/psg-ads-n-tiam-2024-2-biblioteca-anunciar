const { Router } = require("express")
const { getLivros, postLivros, getLivro } = require("../Controller/LivroController")

const router = Router();

router.get("/", getLivros);

router.get(`/:id`, getLivro);

router.post("/" , postLivros);

//router.put("/", putLivro);

//router.delete(`/${id}`, deleteLivro);

module.exports = router;