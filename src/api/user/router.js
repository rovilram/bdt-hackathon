const express = require('express');

const router = express.Router();

const {
  addUser,
  getUser,
  updateUser,
  delUser,
  //   getUsers,
} = require('./controller');

router
  .route('/:id')
  /* ST1: GET /user:id
  Descripción: Obtienes el objeto entero de un usuario */
  .get(getUser)

  /* ST2: DELETE /user/:id
  Descripción: Se puede borrar objeto user a través de su ID */
  .delete(delUser)

  /* ST3: PUT /user/:id
  Descripción: Se puede actualizar un usuario a través de su ID */
  .put(updateUser);

/* ST4: POST /user
  Descripción: Crea un usuario */
router.route('/').post(addUser);

/* ST6: GET /user/:id/github
Description: Devuele los datos de usuario del modelo de githubUser entrando dándo el nombre de usuario github */
router.route('/:id/github').get((req, res) => {
  res.send(`Listar datos github del usuario ${req.params.id}`);
});

/* ST6 BIS: GET /user/:id/gitlab
Description: Devuele los datos de usuario del modelo de gitlabUser entrando dándo el nombre de usuario github */
router.route('/:id/gitlab').get((req, res) => {
  res.send(`Listar datos gitlab del usuario ${req.params.id}`);
});

module.exports = router;
