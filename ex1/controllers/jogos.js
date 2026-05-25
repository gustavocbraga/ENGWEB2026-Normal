const Jogo = require("../models/jogos"); // Importa o modelo correto de Jogos de Tabuleiro

// Procura todos os jogos ou filtra por editora aplicando as projeções do enunciado
function getAll(query) {
  let filter = {};
  let projection = {};

  if (query.editora) {
    // Filtra pelo nome da editora dentro do array de editoras
    filter["editoras.name"] = query.editora;
    // Requisito do PDF: Devolve apenas id (_id), name e year
    projection = { _id: 1, name: 1, year: 1 };
  } else {
    // Requisito do PDF por omissão: Devolve id (_id), name, year, category e minPlayers
    projection = { _id: 1, name: 1, year: 1, category: 1, minPlayers: 1 };
  }

  return Jogo.find(filter, projection).exec();
}

// Procura um jogo pelo seu _id textual (ex: "catan")
function getById(id) {
  return Jogo.findById(id).exec();
}

// Devolve a lista de autores (ordenada alfabeticamente e sem repetições) com os seus jogos
function getAutores() {
  return Jogo.aggregate([
    // Desestrutura o array de autores para processar cada um individualmente
    { $unwind: "$autores" },
    // Agrupa pelo nome do autor e junta os dados simplificados dos jogos onde participou
    {
      $group: {
        _id: "$autores.name",
        jogos: { 
          $push: { 
            id: "$_id", 
            name: "$name" 
          } 
        }
      }
    },
    // Modifica a estrutura de saída para ficar limpa conforme as boas práticas de API
    {
      $project: {
        _id: 0,
        nomeAutor: "$_id",
        jogos: 1
      }
    },
    // Ordena alfabeticamente pelo nome do autor
    { $sort: { nomeAutor: 1 } }
  ]).exec();
}

// Devolve a lista de categorias (ordenada alfabeticamente e sem repetições) com os respetivos jogos
function getCategorias() {
  return Jogo.aggregate([
    // Agrupa diretamente pela string do campo category
    {
      $group: {
        _id: "$category",
        jogos: { 
          $push: { 
            id: "$_id", 
            name: "$name" 
          } 
        }
      }
    },
    // Filtra para remover agrupamentos de campos nulos/vazios, se existirem
    { $match: { _id: { $ne: null } } },
    // Modifica a estrutura de saída
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        jogos: 1
      }
    },
    // Ordena alfabeticamente pela categoria
    { $sort: { categoria: 1 } }
  ]).exec();
}

// Cria um novo registo de jogo de tabuleiro
function create(jogo) {
  // Garante a compatibilidade se o JSON de entrada usar a chave "id" em vez de "_id"
  if (jogo.id && !jogo._id) {
    jogo._id = jogo.id;
  }
  return Jogo.create(jogo);
}

// Atualiza um jogo existente
function update(id, jogo) {
  return Jogo.findByIdAndUpdate(id, jogo, { new: true }).exec();
}

// Elimina um jogo pelo ID
function remove(id) {
  return Jogo.findByIdAndDelete(id).exec();
}

module.exports = {
  getAll,
  getById,
  getAutores,
  getCategorias,
  create,
  update,
  remove
};