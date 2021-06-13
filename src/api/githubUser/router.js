const express = require('express');

const router = express.Router();

const { addGithubUser } = require('./controller');


/* ST7: POST /github/:username
Descripción: Crea un GithubUserl, lo conecta con un usuario previamante creado a través de su id y guarda el User */
router.route('/:username').post(addGithubUser);







module.exports = router;
