const Router = require('express');
const passport = require('passport');
//const { addUser } = require('../api/user/controller-');

const apiRoutes = require('./apiRoutes');

const router = Router();

// test endpoint
router.get('/', (req, res) => {
  res.send("Hello World! I'm a API server");
});


/* ST10: POST /register
Description: Registra al usuario y lo, guarda la sesión usando una estratégia local y envía la información del usuario. En este proceso a través de la función TASK3 para verficiar el correo introducido. */
router.route('/register').post((req, res) => {
  res.send('Registrando usuario');
});

/* ST11: POST /login
Description: Guarda la sesión usando una estratégia local y envía la información al usuario */ 
router.route('/login').post((req, res) => {
  res.send('Logeando usuario');
});

/* 
ST12 post /notification
Descripción: Envía un mensaje de notificación standar al usuario utilizando el config del TASK6 */
router.route('/notification').post((req, res) => {
  res.send('Enviando mensaje');
});



/* router.post('/login', (req, res, next) => {
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
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post('/register', addUser); */


module.exports = router;
