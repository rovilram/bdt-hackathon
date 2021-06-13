axios = require('axios').default;

const { addGitlabUserDB, delGitlabUser } = require('./helpers.js');
const { addGitlabToUser } = require('../user/helpers');

exports.addGitlabUser = async (req, res, next) => {
  const { username } = req.params;
  const { id } = req.body;

  const glUrl1 = 'https://gitlab.com/api/v4/users?username=';
  const glUrl2 = 'https://gitlab.com/api/v4/users/401528/projects';

  try {
    const userResponse = await axios.get(`${glUrl1}${username}`);
    const reposResponse = await axios.get(
      `https://gitlab.com/api/v4/users/${username}/projects`,
    );

    const repositories = reposResponse.data.map((repo) => repo.id);

    console.log(userResponse);

    const userGitLab = {
      id: userResponse.data[0].id,
      username: userResponse.data[0].username,
      url: userResponse.data[0].web_url,
      repositoriesURL: `https://gitlab.com/api/v4/users/${username}/projects`,
      repositories,
    };

    const gitlabUserResponse = await addGitlabUserDB(userGitLab);

    const updateUserResponse = await addGitlabToUser(id, gitlabUserResponse.id);

    if (updateUserResponse)
      res.send({
        OK: 1,
        message: 'usuario actualizado con datos github',
        id,
        idGitlab: updateUserResponse.gitlabUserID,
      });
    else {
      const delGitlabUserResponse = await delGitlabUser(userGitLab.id)
      delGitlabUserResponse && next({
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
