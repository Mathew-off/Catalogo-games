const express = require("express");
const jogosRoutes = require("./src/routes/jogosRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/jogos", jogosRoutes);

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});