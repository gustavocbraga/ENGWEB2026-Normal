var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 

var indexRouter = require("./routes/index");

// MongoDB connection block
var mongoDB = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/livros";
console.log("Connecting to MongoDB at", mongoDB);
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    "Connection Error while trying to connect to MongoDB...",
  ),
);
db.once("open", () => {
  console.log("Connection to MongoDB was successful!");
});

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);

module.exports = app;
