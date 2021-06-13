const mongoose = require('../../app/database');

const countrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  alphaCode: {
    code2: String,
    code3: String,
  },
  callingCode: {
    type: String,
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
