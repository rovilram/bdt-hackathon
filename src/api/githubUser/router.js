const express = require('express');

const router = express.Router();

// const {
//   addUser,
//   getUser,
//   updateUser,
//   delUser,
//   getUsers,
// } = require('./controller');


/* ST7: POST /github/:username
Descripción: Crea un GithubUserl, lo conecta con un usuario previamante creado a través de su id y guarda el User */
router.route('/:username').post((req, res) => {
  res.send(
    `crear usuario gitlab ${req.params.username} para el usuario con ${req.body.id}`,
  );
});







module.exports = router;
