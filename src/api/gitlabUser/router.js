const express = require('express');

const router = express.Router();

// const {
//   addUser,
//   getUser,
//   updateUser,
//   delUser,
//   getUsers,
// } = require('./controller');


/* ST8: POST /gitlab/:username
Descripción: Crea un GitlabUser, lo conecta con un usuario previamante creado a través de su id y guarda el User */
router.route('/:username').post((req, res) => {
  res.send(`crear usuario gitlab ${req.params.username} para el usuario con ${req.body.id}`);
});




module.exports = router;
