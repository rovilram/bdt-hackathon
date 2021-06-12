const express = require('express');
const router = express.Router();
const {
  addRepo,
  getRepo,
  updateRepo,
  delRepo,
  getRepos,
} = require('../repo/controller');

router.route('/').get(getRepos).post(addRepo);

router.route('/:id').get(getRepo).patch(updateRepo).delete(delRepo);

module.exports = router;
