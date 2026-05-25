var express = require('express');
var router = express.Router();
var LivrosController = require('../controllers/livros');

/* GET /api/livros */
router.get('/api/livros', async function(req, res) {
  try {
    const livros = await LivrosController.getAll(req.query);
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* POST /api/livros */
router.post('/api/livros', async function(req, res) {
  try {
    const novoLivro = await LivrosController.create(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* PUT /api/livros/:id */
router.put('/api/livros/:id', async function(req, res) {
  try {
    // Altera o estado booleano 'lido' enviado no corpo do pedido pelo Axios
    const atualizado = await LivrosController.updateStatus(req.params.id, req.body.lido);
    if (!atualizado) return res.status(404).json({ message: "Livro não encontrado." });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE /api/livros/:id */
router.delete('/api/livros/:id', async function(req, res) {
  try {
    const removido = await LivrosController.remove(req.params.id);
    if (!removido) return res.status(404).json({ message: "Livro não encontrado." });
    res.json({ message: "Removido com sucesso", livro: removido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;