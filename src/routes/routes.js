const Router = require('express');
const passport = require('passport');
const { addUser } = require('../api/user/controller');

const router = Router();

// test endpoint
router.get('/', (req, res) => {
  res.send("Hello World! I'm a API server");
});


module.exports = router;
