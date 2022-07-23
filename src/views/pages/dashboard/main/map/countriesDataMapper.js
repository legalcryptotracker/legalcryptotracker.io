import { REAL_COUNTRIES, REAL_COUNTRY_CODE_MAP } from '@/views/pages/dashboard/main/map/countries'

export class CountriesDataMapper {
  map (countriesWithVersion) {
    const countryDataMap = new Map()

    // const countries = countriesWithVersion
    //   .filter(function (country) {
    //     var works = false;
    //     REAL_COUNTRIES.forEach(function (withVersion) {
    //       if (withVersion.code.toLowerCase() == country.code.toLowerCase())
    //         works = true;
    //     });
    //     return works;
    //   });

    countriesWithVersion.forEach((country) => {
      const countryDataItem = countryDataMap.get(country.code);
      if (!countryDataItem) countryDataMap.set(country.code, country);
    });

    return countryDataMap;
  }
}
