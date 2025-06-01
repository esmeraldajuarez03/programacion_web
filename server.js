const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = new sqlite3.Database('./comentarios.db');

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS comentarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  mensaje TEXT,
  fecha TEXT
)`);

// Obtener comentarios
app.get('/', (req, res) => {
  db.all('SELECT * FROM comentarios', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Guardar nuevo comentario
app.post('/', (req, res) => {
  const { nombre, mensaje, fecha } = req.body;
  db.run(`INSERT INTO comentarios (nombre, mensaje, fecha) VALUES (?, ?, ?)`,
    [nombre, mensaje, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nombre, mensaje, fecha });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
