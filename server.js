const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos

const DATA_FILE = path.join(__dirname, 'comentarios.json');

// Crear archivo si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

// Ruta GET - Obtener comentarios
app.get('/api/comentarios', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer comentarios' });
    res.json(JSON.parse(data));
  });
});

// Ruta POST - Agregar comentario
app.post('/api/comentarios', (req, res) => {
  const { nombre, mensaje } = req.body;
  
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al guardar comentario' });
    
    const comentarios = JSON.parse(data);
    const nuevoComentario = {
      id: Date.now(),
      nombre,
      mensaje,
      fecha: new Date().toISOString()
    };
    
    comentarios.unshift(nuevoComentario); // Agrega al inicio
    
    fs.writeFile(DATA_FILE, JSON.stringify(comentarios, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error al guardar' });
      res.status(201).json(nuevoComentario);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});