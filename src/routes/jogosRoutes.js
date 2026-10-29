const express = require("express");
const router = express.Router();

let jogos = [
  { id: 1, titulo: "The Legend of Zelda", plataforma: "Nintendo Switch", genero: "Aventura", anoLancamento: 2017 },
  { id: 2, titulo: "God of War", plataforma: "PlayStation 4", genero: "Ação", anoLancamento: 2018 }
];

let proximoId = 3;

router.get("/", (req, res) => {
  res.json(jogos);
});

router.get("/:id", (req, res) => {
  const jogo = jogos.find(j => j.id === Number(req.params.id));

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  res.json(jogo);
});

router.post("/", (req, res) => {
  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (!titulo || !plataforma || !genero || !anoLancamento) {
    return res.status(400).json({
      mensagem: "Informe titulo, plataforma, genero e anoLancamento"
    });
  }

  const novoJogo = { id: proximoId++, titulo, plataforma, genero, anoLancamento };
  jogos.push(novoJogo);

  res.status(201).json(novoJogo);
});

router.put("/:id", (req, res) => {
  const jogo = jogos.find(j => j.id === Number(req.params.id));

  if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;

  if (!titulo || !plataforma || !genero || !anoLancamento) {
    return res.status(400).json({
      mensagem: "Informe titulo, plataforma, genero e anoLancamento"
    });
  }

  jogo.titulo = titulo;
  jogo.plataforma = plataforma;
  jogo.genero = genero;
  jogo.anoLancamento = anoLancamento;

  res.json(jogo);
});

router.delete("/:id", (req, res) => {
  const indice = jogos.findIndex(j => j.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Jogo não encontrado" });
  }

  jogos.splice(indice, 1);

  res.json({ mensagem: "Jogo removido com sucesso" });
});

module.exports = router;