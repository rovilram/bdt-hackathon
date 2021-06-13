const { getUserByUsername } = require('../api/user/helpers');

const { mailer } = require('../helpers/mailer');

const mailerMiddleware = async (req, res, next) => {
  const { username, message } = req.body;

  if (!username || !message)
    next({
      OK: 0,
      status: 400,
      message: 'El usuario de destino y el mensaje son necesarios',
    });
  else {
    // el mensaje lo manda el usuario que está logeado
    const usernameFrom = req.user ? req.user.username : 'administrador';

    const userResponse = await getUserByUsername(username).catch((error) => {
      next({
        OK: 0,
        status: 500,
        message: `Error: ${error}`,
      });
    });

    if (!userResponse) {
      next({
        OK: 0,
        status: 400,
        message: `No existe usuario con username: ${username}`,
      });
    } else {
      const email = userResponse.email;
      const response = await mailer(email, username, usernameFrom, message);

      if (response)
        res.send({
          OK: 1,
          message: `email mandado a usuario ${username}`,
          emailURL: response === 'OK' ? undefined : response,
        });
    }
  }
};

module.exports = mailerMiddleware;
