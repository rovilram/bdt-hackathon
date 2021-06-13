const axios = require('axios').default;

exports.restcountries = async () => {
  const url = `https://restcountries.eu/rest/v2/all`;

  const response = await axios.get(url);

  const countries = response.data.map(country=> {
    const countryObj = {
      id: country.alpha3Code,
      name: country.name,
      alphaCode: {
        code2: country.alpha2Code,
        code3: country.alpha3Code,
      },
      callingCode: country.callingCodes[0],
    };
    return countryObj;
  })


  return countries;
};
