const express = require('express');
const { getCountries } = require('./controller');

const router = express.Router();

// const {
//   addUser,
//   getUser,
//   updateUser,
//   delUser,
//   getUsers,
// } = require('./controller');


/* ST9: GET /countries
Description: Devuele la lista de paises donde los parámetros que devuelto son los que se muestran en el diseño de la arquitectura */
router.route('/').get(getCountries);



module.exports = router;
