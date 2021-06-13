const Country = require('./model');

exports.getCountriesDB = async () => {
  try {
    const countries = await Country.find({});
    return countries;
  } catch (error) {
    throw error;
  }
};

exports.delCountriesDB = async () => {
  try {
    const response = await Country.deleteMany({});
    return response;
  } catch (error) {
    throw error;
  }
};

exports.addCountriesDB = async (countries) => {
  try {
    const addResult = await Country.insertMany(countries);
    return addResult;
  }
  catch (error) {
    throw error
  }
}
