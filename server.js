const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de archivos
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'comentarios.json');

// Inicialización
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

// Manejo mejorado de errores
function handleFileError(res, err) {
  console.error('File error:', err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

// Rutas
app.post('/api/comentarios', async (req, res) => {
  try {
    const { nombre, mensaje } = req.body;
    if (!nombre || !mensaje) return res.status(400).json({ error: 'Datos incompletos' });

    const data = await fs.promises.readFile(DATA_FILE, 'utf8');
    const comentarios = JSON.parse(data);

    const nuevoComentario = {
      id: Date.now(),
      nombre,
      mensaje,
      fecha: new Date().toISOString()
    };

    comentarios.unshift(nuevoComentario); // Agrega al inicio para mostrar primero los nuevos

    await fs.promises.writeFile(DATA_FILE, JSON.stringify(comentarios, null, 2));
    res.status(201).json(nuevoComentario);
  } catch (err) {
    handleFileError(res, err);
  }
});

app.get('/api/comentarios', async (req, res) => {
  try {
    const data = await fs.promises.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    handleFileError(res, err);
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});