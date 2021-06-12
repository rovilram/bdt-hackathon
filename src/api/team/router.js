const express = require('express');

const router = express.Router();

const {
  getTeams,
  addTeam,
  getTeamByName,
  getTeamByusername,
  getTeam,
  updateTeam,
  delTeam
} = require('./controller');

router.route('/').get(getTeams).post(addTeam);

router.route('/teamname/teamName').get(getTeamByName);

router.route('/user/:username').get(getTeamByusername);

router.route('/:id').get(getTeam).patch(updateTeam)//.delete(delTeam);

module.exports = router;
