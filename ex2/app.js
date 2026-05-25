var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

// Ligação dinâmica baseada nas variáveis de ambiente do Docker Compose
var mongoDB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/leituras";
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de ligação ao MongoDB...'));
db.once('open', () => console.log('Ligação ao MongoDB (Exercício 2) efetuada com sucesso!'));

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir os ficheiros estáticos da interface (onde colocará o index.html fornecido)
app.use(express.static(path.join(__dirname, 'public')));

// Ativa as rotas da API
app.use('/', indexRouter);

module.exports = app;