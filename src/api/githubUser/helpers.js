const UserGithub = require('./model');

exports.addGithubUserDB = async (userData) => {
  const newUser = new UserGithub(userData);
  try {
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw error;
  }
};

exports.delGithubUser = async (id) => {
  try {
    const response = await UserGithub.findOneAndRemove({ id });
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getGithubUser = async (id) => {
  try {
    const response = await UserGithub.findOne({ id });
    return response;
  } catch (error) {
    throw error;
  }
};
