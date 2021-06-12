const User = require('./model');

exports.addUser = async (req, res, next) => {
  const { username, password, email, repos } = req.body;
  if (!username || !password) {
    next({
      status: 400,
      message: 'ERROR, userName y password no pueden estar vacios',
    });
  }

  const newUser = new User({
    username,
    password,
    email,
    repos,
  });
  try {
    const result = await newUser.save();
    res.send({
      OK: 1,
      message: 'usuario añadido',
      id: result.id,
    });
  } catch (error) {
    next({
      status: 400,
      message: `ERROR, usuario NO añadido:, ${error}`,
    });
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findOne({ id }, { _id: 0, password: 0, __v: 0 });

    if (result) {
      res.send({
        OK: 1,
        status: 200,
        message: `usuario ${id} obtenido`,
        user: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el usuario con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido obtener usuario: ${error}`,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, email, repos } = req.body;

  const params = {};

  if (username) params.username = username;
  if (password) params.password = password;
  if (email) params.email = email;
  if (repos) params.repos = repos;

  const options = {
    new: true,
    projection: { _id: 0, password: 0, __v: 0 },
  };

  try {
    const result = await User.findOneAndUpdate({ id }, params, options);
    if (result) {
      res.send({
        OK: 1,
        message: `usuario ${id} actualizado`,
        user: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el usuario con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido obtener usuario: ${error}`,
    });
  }
};

exports.delUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await User.findOneAndRemove({ id }).select({
      _id: 0,
      password: 0,
      __v: 0,
    });
    if (result) {
      res.send({
        OK: 1,
        status: 200,
        message: `usuario ${id} eliminado`,
        user: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el usuario con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido encontrar usuario: ${error}`,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const result = await User.find({}, { _id: 0, password: 0, __v: 0 });
    if (result) {
      res.send({
        OK: 1,
        status: 200,
        message: 'todos los usuarios obtenidos',
        user: result,
      });
    } else {
      next({
        status: 400,
        message: 'No hay usuarios en la base de datos',
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se han podido obtener usuarios: ${error}`,
    });
  }
};
