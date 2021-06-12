const Team = require('./model');

exports.addTeam = async (req, res, next) => {
  const { teamName, description, users, repos } = req.body;

  const newTeam = new Team({
    teamName,
    description,
    users,
    repos,
  });
  try {
    const result = await newTeam.save();
    res.send({
      OK: 1,
      message: 'equipo añadido',
      id: result.id,
    });
  } catch (error) {
    next({
      status: 400,
      message: `ERROR, equipo NO añadido:, ${error}`,
    });
  }
};

exports.getTeams = async (req, res, next) => {
  try {
    const result = await Team.find({});
    if (result.length)
      res.send({
        OK: 1,
        message: 'todos los equipos obtenidos',
        teams: result,
      });
    else
      next({
        OK: 0,
        status: 404,
        message: 'No hay equipos',
      });
  } catch (error) {
    next({ OK: 0, status: 500, message: `Error: ${error}` });
  }
};

exports.getTeamByName = async (req, res, next) => {
  const { teamName } = req.params;

  try {
    const result = await Team.findOne({
      teamName,
    });

    if (result) {
      res.send({
        OK: 1,
        message: `obtenido equipo ${teamName}`,
        team: result,
      });
    } else
      next({
        OK: 0,
        status: 404,
        message: `equipo ${teamName} no encontrado`,
      });
  } catch (error) {
    next({
      OK: 0,
      status: 500,
      message: `Error: ${error}`,
    });
  }
};

exports.getTeamByusername = async (req, res, next) => {
  const { username } = req.params;

  try {
    const result = await Team.find({
      'users.username': username,
    });

    if (result.length) {
      res.send({
        OK: 1,
        message: `equipos que contengan a ${username}`,
        team: result,
      });
    } else
      next({
        OK: 0,
        status: 404,
        message: `${username} no tiene equipos`,
      });
  } catch (error) {
    next({
      OK: 0,
      status: 500,
      message: `Error: ${error}`,
    });
  }
};

exports.getTeam = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Team.findOne({
      id,
    });

    if (result) {
      res.send({
        OK: 1,
        message: `obtenido equipo con ${id}`,
        team: result,
      });
    } else
      next({
        OK: 0,
        status: 404,
        message: `no hay equipo con ${id}`,
      });
  } catch (error) {
    next({
      OK: 0,
      status: 500,
      message: `Error: ${error}`,
    });
  }
};

exports.updateTeam = async (req, res, next) => {
  const { id } = req.params;
  const { teamName, description, users, repos } = req.body;
  try {
    const result = await Team.findOneAndUpdate(
      { id },
      {
        teamName,
        description,
        users,
        repos,
      },
      { new: true },
    );
    console.log('UPDATE', result);
    if (result) {
      res.send({
        OK: 1,
        message: `equipo con id:${id}`,
        team: result,
      });
    } else
      next({
        OK: 0,
        status: 404,
        message: `no hay equipos con id:${id}`,
      });
  } catch (error) {
    next({
      OK: 0,
      status: 500,
      message: `Error al buscar equipo: ${error}`,
    });
  }
};
