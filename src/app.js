'use Strict';

const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes/routes');
const apiRoutes = require('./routes/apiRoutes');
const passport = require('./app/passport');

const errorMiddleware = require('./middlewares/errorMiddleware');
const notFound404 = require('./middlewares/notFound404');


// cada vez que arrancamos el servidor vamos a borrar todos los paises y los volvemos a cargar desde la API
const {updateCountries} = require('./helpers/updateCountries')
updateCountries();




const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

const secretKey = process.env.SECRET_KEY || 'secretoAutenticacionNuwe';
app.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // cookie expirate time 1 hour
  }),
);
app.use(cookieParser(secretKey));

app.use(passport.initialize());
app.use(passport.session());


// Public endpoints
app.use('/', routes);

// Private endpoints
app.use(
  '/',
  (req, res, next) => {
    if (req.isAuthenticated()) next();
    else {
      console.log('error de autentiacion');
      next({
        status: 404,
        message: 'no estás logeado',
      });
    }
  },
  apiRoutes,
);

app.use(notFound404);
app.use(errorMiddleware);

module.exports = app;
