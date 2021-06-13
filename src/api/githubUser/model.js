const mongoose = require('../../app/database');

const userGithubSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  repositories: {
    type: Array,
    default: [],
  },
  repositoriesURL: {
    type: String,
    required: true,
  }
});

const UserGithub = mongoose.model('UserGithub', userGithubSchema);

module.exports = UserGithub;
