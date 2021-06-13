axios = require('axios').default;

const { addGithubUserDB, delGithubUser } = require('./helpers.js');
const { addGithubToUser } = require('../user/helpers');

exports.addGithubUser = async (req, res, next) => {
  const { username } = req.params;
  const { id } = req.body;

  const ghUrl = 'https://api.github.com/users/';

  try {
    const userResponse = await axios.get(`${ghUrl}${username}`);
    const reposResponse = await axios.get(`${ghUrl}${username}/repos`);
    const repositories = reposResponse.data.map((repo) => repo.id);

    const userGithub = {
      id: userResponse.data.id,
      username: userResponse.data.login,
      url: userResponse.data.html_url,
      repositoriesURL: userResponse.data.repos_url,
      repositories,
    };

    const githubUserResponse = await addGithubUserDB(userGithub);

    const updateUserResponse = await addGithubToUser(id, githubUserResponse.id);

    if (updateUserResponse)
      res.send({
        OK: 1,
        message: 'usuario actualizado con datos github',
        id,
        idGithub: updateUserResponse.githubUserID,
      });
    else {
      const delGithubUserResponse = await delGithubUser(userGitLab.id);
      delGithubUserResponse &&
        next({
          OK: 0,
          status: 400,
          message: `No existe el usuario con id ${id}`,
        });
    }
  } catch (error) {
    next({
      OK: 0,
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
