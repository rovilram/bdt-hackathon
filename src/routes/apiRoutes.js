const express = require('express');

const userRouter = require('../api/user/router');
const githubRouter = require('../api/githubUser/router');
const gitlabRouter = require('../api/gitlabUser/router');
const countriesRouter = require('../api/country/router');


const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();


router.use('/user', userRouter);
router.use('/github', githubRouter);
router.use('/gitlab', gitlabRouter);
router.use('/countries', countriesRouter);



module.exports = router;
