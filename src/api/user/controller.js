const User = require('./model');

const { addUserDB, getUserDB, delUserDB, updateUserDB } = require('./helpers');
const { getGithubUser } = require('../githubUser/helpers');
const { getGitlabUser } = require('../gitlabUser/helpers');

exports.addUser = (req, res, next) => {
  addUserDB(req.body)
    .then((response) => {
      req.response = response;
      next();
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
      console.log(response);
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

exports.getGithub = async (req, res, next) => {
  const { id } = req.params;
  const responseUser = await getUserDB(id).catch((error) => {
    next({
      status: 500,
      message: `ERROR, no se ha podido encontrar usuario: ${error}`,
    });
  });
  if (responseUser) {
    const responseGithubUser = await getGithubUser(
      responseUser.githubUserID,
    ).catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido encontrar usuario: ${error}`,
      });
    });
    if (responseGithubUser)
      res.send({
        OK: 1,
        message: `registro de github del usuario con ID: ${id}`,
        githubUser: responseGithubUser,
      });
    else {
      next({
        OK: 0,
        status: 400,
        message: `El usuario con Id: ${id}, no tiene registros en Github`,
      });
    }
  } else {
    next({
      OK: 0,
      status: 400,
      message: `No existe el usuario con esta ID: ${id}`,
    });
  }
};

exports.getGitlab = async (req, res, next) => {
  const { id } = req.params;
  const responseUser = await getUserDB(id).catch((error) => {
    next({
      status: 500,
      message: `ERROR, no se ha podido encontrar usuario: ${error}`,
    });
  });
  if (responseUser) {
    const responseGitlabUser = await getGitlabUser(
      responseUser.gitlabUserID,
    ).catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido encontrar usuario: ${error}`,
      });
    });
    if (responseGitlabUser)
      res.send({
        OK: 1,
        message: `registro de gitlab del usuario con ID: ${id}`,
        gitlabUser: responseGitlabUser,
      });
    else {
      next({
        OK: 0,
        status: 400,
        message: `El usuario con Id: ${id}, no tiene registros en gitlab`,
      });
    }
  } else {
    next({
      OK: 0,
      status: 400,
      message: `No existe el usuario con esta ID: ${id}`,
    });
  }
};
