const User = require('./model');

exports.addUserDB = async (userData) => {
  const newUser = new User(userData);
  try {
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getUserDB = async (id) => {
  try {
    const result = await User.findOne({ id }, { _id: 0, password: 0, __v: 0 });
    return result;
  } catch (error) {
    throw error;
  }
};


exports.getUserByUsername = async (username) => {
  try {
    const result = await User.findOne({ username }, { _id: 0, password: 0, __v: 0 });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.delUserDB = async (id) => {
  try {
    const result = await User.findOneAndRemove({ id }).select({
      _id: 0,
      password: 0,
      __v: 0,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateUserDB = async (id, userData) => {
  const options = {
    new: true,
    projection: { _id: 0, password: 0, __v: 0 },
  };

  try {
    const result = await User.findOneAndReplace({ id }, userData, options);
    return result;
  } catch (error) {
    throw error;
  }
};


exports.addGithubToUser = async (id, idGitHub) => {
  const options = {
    new: true,
    projection: { _id: 0, password: 0, __v: 0 },
  };

  try {
    const result = await User.findOneAndUpdate(
      { id },
      {
        githubUserID: idGitHub,
      },
      options,
    );
    return result;
  } catch (error) {
    throw error;
  }
};


exports.addGitlabToUser = async (id, idGitlab) => {
  const options = {
    new: true,
    projection: { _id: 0, password: 0, __v: 0 },
  };

  try {
    const result = await User.findOneAndUpdate(
      { id },
      {
        gitlabUserID: idGitlab,
      },
      options,
    );
    return result;
  } catch (error) {
    throw error;
  }
};