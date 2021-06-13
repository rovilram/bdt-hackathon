const UserGitlab = require('./model');

exports.addGitlabUserDB = async (userData) => {
  const newUser = new UserGitlab(userData);
  try {
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw error;
  }
};


exports.delGitlabUser = async (id) => {
  try {
    const response = await UserGitlab.findOneAndRemove({id});
    return response;
  }catch(error) {
    throw(error)
  }
}


exports.getGitlabUser = async (id) => {
  try {
    const response = await UserGitlab.findOne({ id });
    return response;
  } catch (error) {
    throw error;
  }
};