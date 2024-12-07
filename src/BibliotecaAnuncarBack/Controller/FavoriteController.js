// controllers/FavoriteController.js
let favoriteBooks = [];

async function getFavorites(req, res) {
    try {
        res.send(favoriteBooks);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function addFavorite(req, res) {
    try {
        const book = req.body;
        favoriteBooks.push(book);
        res.status(201).json(book);
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
    getFavorites,
    addFavorite,
    removeFavorite,
};
