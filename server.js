// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta del archivo JSON
const DATA_FILE = path.join(__dirname, 'data', 'comentarios.json');

// Crear archivo si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// Ruta POST para guardar comentario
app.post('/api/comentarios', (req, res) => {
  const { nombre, mensaje } = req.body;

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    const comentarios = JSON.parse(data);
    const nuevoComentario = {
      id: Date.now(),
      nombre,
      mensaje,
      fecha: new Date().toISOString()
    };

    comentarios.push(nuevoComentario);

    fs.writeFile(DATA_FILE, JSON.stringify(comentarios, null, 2), (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(nuevoComentario);
    });
  });
});

// Ruta GET para obtener comentarios
app.get('/api/comentarios', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(JSON.parse(data));
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});