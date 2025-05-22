const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const filePath = path.join(__dirname, 'comentarios.json');

// Obtener comentarios
app.get('/comentarios', (req, res) => {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
  const data = fs.readFileSync(filePath, 'utf8');
  res.json(JSON.parse(data));
});

// Guardar comentario
app.post('/comentarios', (req, res) => {
  const nuevoComentario = req.body;
  let comentarios = [];

  if (fs.existsSync(filePath)) {
    comentarios = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  comentarios.push(nuevoComentario);
  fs.writeFileSync(filePath, JSON.stringify(comentarios, null, 2));
  res.json({ status: 'Comentario guardado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
