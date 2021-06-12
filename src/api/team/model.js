const mongoose = require('../../app/database');
const { nanoid } = require('nanoid');

const teamSchema = new mongoose.Schema({
  id: {
    type: String,
    default: nanoid,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  users: [
    {
      username: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],
  repos: [
    {
      repoName: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      owner: {
        type: String,
        required: true,
      },
    },
  ],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
