const User = require('./model');

const { addUserDB, getUserDB, delUserDB, updateUserDB } = require('./helpers');

exports.addUser = (req, res, next) => {
  addUserDB(req.body)
    .then((response) => {
      res.send({
        OK: 1,
        message: 'usuario añadido',
        id: response.id,
      });
    })
    .catch((error) => {
      next({
        status: 400,
        message: `ERROR, usuario NO añadido:, ${error}`,
      });
    });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;

  getUserDB(id)
    .then((response) => {
      if (response)
        res.send({
          OK: 1,
          status: 200,
          message: `usuario ${id} obtenido`,
          user: response,
        });
      else
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
    })
    .catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido obtener usuario: ${error}`,
      });
    });
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, email, repos } = req.body;

  updateUserDB(id, req.body)
    .then((response) => {
      console.log(response)
      if (response) {
        res.send({
          OK: 1,
          message: `usuario actualizado`,
          id: response.id,
        });
      } else {
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
      }
    })
    .catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido obtener usuario: ${error}`,
      });
    });
};

exports.delUser = async (req, res, next) => {
  const { id } = req.params;
  delUserDB(id)
    .then((response) => {
      console.log(response);
      if (response) {
        res.send({
          OK: 1,
          message: `usuario eliminado`,
          id: response.id,
        });
      } else {
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
      }
    })
    .catch((error) =>
      next({
        status: 500,
        message: `ERROR, no se ha podido encontrar usuario: ${error}`,
      }),
    );
};

