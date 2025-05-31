const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Usamos la versión con promesas
const path = require('path');

const app = express();

// Configuración mejorada de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://tuusuario.github.io'], // Reemplaza con tu URL de GitHub Pages
  methods: ['GET', 'POST']
}));

app.use(express.json({ limit: '10kb' })); // Límite de tamaño para JSON
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'comentarios.json');

// Validación de datos
const validateComment = (comment) => {
  if (!comment?.nombre || !comment?.mensaje) return false;
  return (
    typeof comment.nombre === 'string' && 
    typeof comment.mensaje === 'string' &&
    comment.nombre.trim().length > 0 &&
    comment.mensaje.trim().length > 0 &&
    comment.nombre.length <= 100 &&
    comment.mensaje.length <= 500
  );
};

// Middleware para manejo de errores centralizado
const handleErrors = (res, error) => {
  console.error('Error en el servidor:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Ruta GET - Optimizada con async/await
app.get('/api/comentarios', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    handleErrors(res, error);
  }
});

// Ruta POST - Mejorada con validación
app.post('/api/comentarios', async (req, res) => {
  try {
    const { nombre, mensaje } = req.body;
    
    if (!validateComment({ nombre, mensaje })) {
      return res.status(400).json({ error: 'Datos del comentario inválidos' });
    }

    const data = await fs.readFile(DATA_FILE, 'utf8');
    const comentarios = JSON.parse(data);
    
    const nuevoComentario = {
      id: Date.now(),
      nombre: nombre.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString()
    };

    comentarios.unshift(nuevoComentario);
    
    await fs.writeFile(DATA_FILE, JSON.stringify(comentarios, null, 2));
    res.status(201).json(nuevoComentario);
    
  } catch (error) {
    handleErrors(res, error);
  }
});

// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ status: 'active', timestamp: new Date().toISOString() });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Endpoint de comentarios: http://localhost:${PORT}/api/comentarios`);
});