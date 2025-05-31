const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Para que se puedan comunicar desde tu GitHub Pages
app.use(cors());
app.use(express.json());

let comentarios = [];

app.get('/comentarios', (req, res) => {
  res.json(comentarios);
});

app.post('/comentarios', (req, res) => {
  const nuevoComentario = req.body;
  comentarios.push(nuevoComentario);
  res.status(201).json({ mensaje: 'Comentario recibido', comentario: nuevoComentario });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
