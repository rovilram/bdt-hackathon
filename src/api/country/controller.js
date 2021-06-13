const { getCountriesDB } = require('./helpers');

exports.getCountries = (req, res, next) => {
  const response = getCountriesDB().catch((error) => {
    next({ OK: 0, status: 500, message: `Error: ${error}` });
  });

  if (response.length)
    res.send({
      OK: 1,
      message: 'lista de paises',
      countries: response,
    });
  else {
    next({ OK: 0, status: 400, message: 'No hay paises guardados' });
  }
};
