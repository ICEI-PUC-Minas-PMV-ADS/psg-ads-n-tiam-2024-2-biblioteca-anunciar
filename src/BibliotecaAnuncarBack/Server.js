const express = require('express')
const app = express();
const rotaLivro = require("./Routes/LivroRoutes")

app.use(express.json());

app.use('/livro', rotaLivro)

app.listen(3000);

console.log('Servidor Rodando na porta 3000');