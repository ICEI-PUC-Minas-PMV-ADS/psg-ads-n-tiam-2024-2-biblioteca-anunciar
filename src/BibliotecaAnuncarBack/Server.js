const express = require('express');
const cors = require('cors');
const app = express();
// const rotaLivro = require("./Routes/LivroRoutes");
// const rotaFavorite = require("./Routes/favoriteRoutes");
const routes = require('./index');

app.use(cors());
app.use(express.json());

// app.use('/livro', rotaLivro);
// app.use('/favorites', rotaFavorite); // Usar rotas de favoritos

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Servidor Rodando na porta ${PORT}`); });
