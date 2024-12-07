const { addLivro, getAllLivro, getLivroId, } = require("../Service/LivroService");
const { Livro } = require('../Models/Livro');

async function getLivros(req, res) {
  try {
    let livros = [];
    livros = await getAllLivro();
    if (livros) {
      res.send(livros);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

async function getLivro(req, res) {
  try {
    const id = req.params.id;
    const livro = await getLivroId(id);
    if (livro) {
      res.send(livro);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

async function postLivros(req, res) {
  try {
    const livro = req.body;
    const livroAdc = await addLivro(livro);
    console.log(livroAdc, 'teste')
    res.status(201)
    res.send(livroAdc)
  } catch (error) {
    res.send(error);
    res.status(500);
  }
}

let favoriteBooks = [];
async function getFavorites(req, res) {
  res.send(favoriteBooks);
}
async function addFavorite(req, res) {
  try {
    const book = req.body;
    favoriteBooks.push(book);
    res.status(201).send(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function removeFavorite(req, res) {
  try {
    const id = req.params.id;
    favoriteBooks = favoriteBooks.filter(book => book.livroId !== id);
    res.status(204).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivros,
  getFavorites,
  addFavorite,
  removeFavorite,
};
