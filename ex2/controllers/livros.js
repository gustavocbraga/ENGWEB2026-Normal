const Livro = require("../models/livros");
const crypto = require("crypto"); 

// GET /api/livros (com suporte opcional a ?search=X)
function getAll(query) {
  let filter = {};
  if (query.search) {
    filter.$or = [
      { titulo: new RegExp(query.search, "i") },
      { autor: new RegExp(query.search, "i") }
    ];
  }
  return Livro.find(filter).exec();
}

// POST /api/livros
function create(livroData) {
  const novoObjeto = {
    titulo: livroData.titulo || livroData.Titulo,
    autor: livroData.autor || livroData.Autor,
    // Garante que o texto do input HTML é convertido para número real
    paginas: livroData.paginas ? parseInt(livroData.paginas, 10) : 0,
    genero: livroData.genero || livroData.Genero,
    lido: livroData.lido !== undefined ? livroData.lido : false
  };

  // NÃO injete o _id aqui. O MongoDB tratará disso automaticamente.

  console.log("👉 ENVIANDO PARA O MONGOOSE:", novoObjeto);
  return Livro.create(novoObjeto);
}

// PUT /api/livros/:id
function updateStatus(id, lidoStatus) {
  return Livro.findByIdAndUpdate(
    id, 
    { lido: lidoStatus }, 
    { new: true }
  ).exec();
}

// DELETE /api/livros/:id
function remove(id) {
  return Livro.findByIdAndDelete(id).exec();
}

module.exports = {
  getAll,
  create,
  updateStatus,
  remove
};