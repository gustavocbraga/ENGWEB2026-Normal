const mongoose = require("mongoose");

// Sub-esquema para os Autores
const autorSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  }
}, { _id: false });

// Sub-esquema para as Editoras
const editoraSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String 
  }
}, { _id: false });

// Sub-esquema para as Mecânicas
const mecanicaSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  }
}, { _id: false });

// Sub-esquema para os Prémios
const premioSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number 
  }
}, { _id: false });

// Esquema Principal para o Jogo de Tabuleiro
const jogoSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true // Corresponde ao "catan" no seu exemplo
  },
  name: { 
    type: String, 
    required: true 
  },
  year: { 
    type: Number 
  },
  category: { 
    type: String 
  },
  minPlayers: { 
    type: Number 
  },
  maxPlayers: { 
    type: Number 
  },
  playingTimeMinutes: { 
    type: Number 
  },
  descriptionEN: { 
    type: String 
  },
  autores: [autorSchema],
  editoras: [editoraSchema],
  mecanicas: [mecanicaSchema],
  premios: [premioSchema]
}, { 
  // Desativa o campo de versionamento automático do Mongoose (__v)
  versionKey: false 
});

// Exporta o modelo associado à coleção "jogos"
module.exports = mongoose.model("jogos", jogoSchema);