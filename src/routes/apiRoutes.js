const express = require('express');

const userRouter = require('../api/user/router');
const githubRouter = require('../api/githubUser/router');
const gitlabRouter = require('../api/gitlabUser/router');
const countriesRouter = require('../api/country/router');

const mailerMiddleware = require('../middlewares/mailerMiddleware');

const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

/* 
ST12 post /notification
Descripción: Envía un mensaje de notificación standar al usuario utilizando el config del TASK6 */
router.route('/notification').post(mailerMiddleware);


router.use('/user', userRouter);
router.use('/github', githubRouter);
router.use('/gitlab', gitlabRouter);
router.use('/countries', countriesRouter);



module.exports = router;
