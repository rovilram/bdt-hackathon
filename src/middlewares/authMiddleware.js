const passport = require('passport');

const authMiddleware = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user)
      next({
        OK: 0,
        status: 403,
        message: 'Usuario / contraseña incorrectos',
      });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ OK: 1, message: 'Usuario logeado' });
      });
    }
  })(req, res, next);
};

module.exports = authMiddleware;
