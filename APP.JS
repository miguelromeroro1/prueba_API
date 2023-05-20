const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configurar el middleware body-parser
app.use(bodyParser.json());

// Base de datos simulada para almacenar usuarios registrados
let usersDB = {
  "usuario1": "contraseña1",
  "usuario2": "contraseña2"
};

// Ruta para registro e inicio de sesión
app.post('/auth', (req, res) => {
  const { usuario, contraseña, accion } = req.body;

  if (accion === 'registro') {
    // Verificar si el usuario ya está registrado
    if (usersDB.hasOwnProperty(usuario)) {
      res.status(400).json({ error: 'El usuario ya está registrado' });
    } else {
      // Guardar el usuario y contraseña en la base de datos
      usersDB[usuario] = contraseña;
      res.status(200).json({ mensaje: 'Registro exitoso' });
    }
  } else if (accion === 'login') {
    // Verificar la autenticación del usuario
    if (usersDB.hasOwnProperty(usuario) && usersDB[usuario] === contraseña) {
      res.status(200).json({ mensaje: 'Autenticación satisfactoria' });
    } else {
      res.status(401).json({ error: 'Error en la autenticación' });
    }
  } else {
    res.status(400).json({ error: 'Acción inválida' });
  }
});

// Ruta para borrar todos los usuarios
app.delete('/auth/:usuario', (req, res) => {
  const usuario = req.params.usuario;

  if (usersDB.hasOwnProperty(usuario)) {
    delete usersDB[usuario];
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'El usuario no existe' });
  }
});

const puerto = 3000; // Puerto que deseas utilizar

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
  console.log(usersDB);
});


