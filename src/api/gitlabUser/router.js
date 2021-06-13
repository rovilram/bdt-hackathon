const express = require('express');

const router = express.Router();

const { addGitlabUser } = require('./controller');

/* ST8: POST /gitlab/:username
Descripción: Crea un GitlabUser, lo conecta con un usuario previamante creado a través de su id y guarda el User */
router.route('/:username').post(addGitlabUser);

module.exports = router;
