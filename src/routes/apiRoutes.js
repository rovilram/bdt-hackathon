const express = require('express');

const userRouter = require('../api/user/router');
const repoRouter = require('../api/repo/router');
const teamRouter = require('../api/team/router');


const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

router.use('/user', userRouter);

router.use('/repo', repoRouter);

router.use('/team', teamRouter);

module.exports = router;
