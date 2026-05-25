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
  if (!livroData._id && !livroData.id) {
    livroData._id = crypto.randomUUID();
  }
  return Livro.create(livroData);
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