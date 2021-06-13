const { delCountriesDB, addCountriesDB } = require('../api/country/helpers');
const { restcountries } = require('../app/restcountries');

exports.updateCountries = async () => {
  const delResponse = await delCountriesDB().catch((error) => {
    console.log(`Error al borrar colección de paises: ${error}`);
  });

  if (delResponse.ok) console.log('colección de paises borrada');

  const countries = await restcountries();

  countries.length && addCountriesDB(countries) && console.log(`añadidos ${countries.length} paises a la colección`);
};
