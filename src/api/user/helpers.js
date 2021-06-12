const User = require('./model');

exports.addUserDB = async (userData) => {
  const newUser = new User(userData);
  console.log(newUser);
  try {
    const result = await newUser.save();
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getUserDB = async (id) => {
  try {
    console.log(id);
    const result = await User.findOne({ id }, { _id: 0, password: 0, __v: 0 });
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
    const result = await User.findOneAndUpdate({ id }, userData, options);
    return result;
  } catch (error) {
    throw error;
  }
};
