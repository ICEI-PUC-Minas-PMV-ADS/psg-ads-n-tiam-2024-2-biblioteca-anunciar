const {
  addLivro,
  getAllLivro,
  getLivroId,
  deleteLivroById,
  editLivro,
} = require("../Service/LivroService");
const { Livro } = require("../Models/Livro");
const schedule = require("node-schedule");
const { doc, getDoc, updateDoc } = require("firebase/firestore");
const { db } = require("../FirebaseConnection");

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
    console.log(livroAdc, "teste");
    res.status(201);
    res.send(livroAdc);
  } catch (error) {
    res.send(error);
    res.status(500);
  }
}
async function deleteLivro(req, res) {
  try {
    const id = req.params.id;
    const resultado = await deleteLivroById(id);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function putLivro(req, res) {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    const resultado = await editLivro(id, dadosAtualizados);
    if (!resultado) {
      return res.status(404).send({ error: "Livro não encontrado." });
    }
    console.log("test");
    res
      .status(200)
      .send({ message: "Livro atualizado com sucesso!!", livro: resultado });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function reservarLivro(req, res) {
  try {
    const id = req.params.id;
    const dadosAtualizados = { disponivel: "N" };
    const resultado = await editLivro(id, dadosAtualizados);

    if (!resultado) {
      return res.status(404).send({ error: "Livro não encontrado." });
    }
    schedule.scheduleJob(
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      async () => {
        //schedule.scheduleJob(new Date(Date.now() + 10 * 1000) teste para 10 segundos
        try {
          await editLivro(id, { disponivel: "S" });
        } catch (error) {
          console.error(
            `Erro ao reverter disponibilidade do livro ${id}:`,
            error.message
          );
        }
      }
    );

    res
      .status(200)
      .send({ message: "Livro reservado com sucesso!", livro: resultado });
  } catch (error) {
    console.error("Erro na função reservarLivro:", error.message);
    res.status(500).send({ error: error.message });
  }
}

async function alternarFavorito(req, res) {
  try {
    const { userId, livroId } = req.params;
    console.log("Recebido userId:", userId, "livroId:", livroId);

    const referenciaUsuario = doc(db, "users", userId);
    const documentoUsuario = await getDoc(referenciaUsuario);

    if (!documentoUsuario.exists()) {
      console.log("Usuário não encontrado.");
      return res.status(404).send({ erro: "Usuário não encontrado" });
    }

    const listaFavoritos = documentoUsuario.data().favoritos || [];

    const jaFavoritado = listaFavoritos.includes(livroId);
    const novaListaFavoritos = jaFavoritado
      ? listaFavoritos.filter((id) => id !== livroId)
      : [...listaFavoritos, livroId];

    await updateDoc(referenciaUsuario, { favoritos: novaListaFavoritos });

    console.log("Favoritos atualizados:", novaListaFavoritos);

    res.status(200).send({
      mensagem: jaFavoritado
        ? "Livro removido dos favoritos"
        : "Livro adicionado aos favoritos!",
      favoritos: novaListaFavoritos,
    });
  } catch (erro) {
    console.error("Erro no alternarFavorito:", erro.message);
    res.status(500).send({ erro: erro.message });
  }
}
async function buscarFavoritos(req, res) {
  try {
    const { userId } = req.params;
    const referenciaUsuario = doc(db, "users", userId);
    const documentoUsuario = await getDoc(referenciaUsuario);

    if (!documentoUsuario.exists()) {
      return res.status(404).send({ erro: "Usuário não encontrado" });
    }

    const favoritos = documentoUsuario.data().favoritos || [];
    res.status(200).send({ favoritos });
  } catch (erro) {
    res.status(500).send({ erro: erro.message });
  }
}

module.exports = {
  getLivros,
  getLivro,
  postLivros,
  putLivro,
  deleteLivro,
  reservarLivro,
  alternarFavorito,
  buscarFavoritos
};
