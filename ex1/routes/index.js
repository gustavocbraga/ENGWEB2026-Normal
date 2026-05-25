var express = require("express");
var router = express.Router();
var JogosController = require("../controllers/jogos");

router.get("/autores", async (req, res) => {
  try {
    const autores = await JogosController.getAutores();
    res.json(autores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/categorias", async (req, res) => {
  try {
    const categorias = await JogosController.getCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/jogos", async (req, res) => {
  try {
    const jogos = await JogosController.getAll(req.query);
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/jogos/:id", async (req, res) => {
  try {
    const jogo = await JogosController.getById(req.params.id);
    if (!jogo) return res.status(404).json({ message: "Jogo não encontrado." });
    res.json(jogo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/jogos", async (req, res) => {
  try {
    const novoJogo = await JogosController.create(req.body);
    res.status(201).json(novoJogo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/jogos/:id", async (req, res) => {
  try {
    const atualizado = await JogosController.update(req.params.id, req.body);
    if (!atualizado) return res.status(404).json({ message: "Jogo não encontrado." });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/jogos/:id", async (req, res) => {
  try {
    const removido = await JogosController.remove(req.params.id);
    if (!removido) return res.status(404).json({ message: "Jogo não encontrado." });
    res.json({ message: "Removido com sucesso", jogo: removido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;