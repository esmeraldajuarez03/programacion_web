// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // sirve tus archivos frontend

// Leer comentarios
app.get('/comentarios', (req, res) => {
  fs.readFile('comentarios.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error leyendo archivo' });
    res.json(JSON.parse(data || '[]'));
  });
});

// Guardar comentario nuevo
app.post('/comentarios', (req, res) => {
  const nuevoComentario = req.body;
  fs.readFile('comentarios.json', 'utf8', (err, data) => {
    let comentarios = [];
    if (!err && data) comentarios = JSON.parse(data);

    comentarios.push(nuevoComentario);

    fs.writeFile('comentarios.json', JSON.stringify(comentarios, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Error guardando' });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
