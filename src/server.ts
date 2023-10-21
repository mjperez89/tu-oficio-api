const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Configuración básica de la base de datos (en memoria)
const users = [
  { id: 1, username: 'usuario1', password: 'contrasena1' },
  { id: 2, username: 'usuario2', password: 'contrasena2' },
];

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
