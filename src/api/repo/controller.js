const Repo = require('./model');

exports.addRepo = async (req, res, next) => {
  const { name, url, description, stack } = req.body;

  const newRepo = new Repo({
    name,
    url,
    description,
    stack,
  });

  try {
    const result = await newRepo.save();
    res.send({
      OK: 1,
      message: 'repositorio añadido',
      id: result.id,
    });
  } catch (error) {
    next({
      status: 400,
      message: `ERROR, repositorio NO añadido:, ${error}`,
    });
  }
};

exports.getRepo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Repo.findOne({ id }, { _id: 0, __v: 0 });

    if (result) {
      res.send({
        OK: 1,
        message: `repositorio ${id} obtenido`,
        repo: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el repositorio con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido obtener repositorio: ${error}`,
    });
  }
};

exports.updateRepo = async (req, res, next) => {
  const { id } = req.params;
  const { name, url, description, stack } = req.body;

  const params = {};

  if (name) params.name = name;
  if (url) params.url = url;
  if (description) params.description = description;
  if (stack) params.stack = stack;

  const options = {
    new: true,
    projection: { _id: 0, __v: 0 },
  };

  try {
    const result = await Repo.findOneAndUpdate({ id }, params, options);
    if (result) {
      res.send({
        OK: 1,
        status: 200,
        message: `repositorio ${id} actualizado`,
        repo: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el repositorio con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido obtener repositorio: ${error}`,
    });
  }
};

exports.delRepo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Repo.findOneAndRemove({ id }).select({
      _id: 0,
      __v: 0,
    });
    if (result) {
      res.send({
        OK: 1,
        message: `repositorio ${id} eliminado`,
        repo: result,
      });
    } else {
      next({
        status: 400,
        message: `No existe el repositorio con esta ID: ${id}`,
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se ha podido encontrar repositorio: ${error}`,
    });
  }
};

exports.getRepos = async (req, res, next) => {
  try {
    const result = await Repo.find({}, { _id: 0, __v: 0 });
    if (result) {
      res.send({
        OK: 1,
        status: 200,
        message: 'todos los repositorios obtenidos',
        repos: result,
      });
    } else {
      next({
        status: 400,
        message: 'No hay repositorios en la base de datos',
      });
    }
  } catch (error) {
    next({
      status: 500,
      message: `ERROR, no se han podido obtener repositorios: ${error}`,
    });
  }
};
