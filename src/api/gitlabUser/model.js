const mongoose = require('../../app/database');

const userGitlabSchema = new mongoose.Schema({
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

const UserGitlab = mongoose.model('UserGitlab', userGitlabSchema);

module.exports = UserGitlab;
