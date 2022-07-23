import qs from 'qs';

function getVersions() {
  var page = -1
    , pageSize = 100
    , versions = [];

  function fetchPage() {
    var config = {};
    var query = qs.stringify({
      fields: ['number'],
      populate: ['country'],
      sort: ['country.id:asc'],
      pagination: { pageSize: pageSize, page: page },
    });
    var url = `${process.env.VUE_APP_STRAPI_URL}/api/versions?${query}`;
    return fetch(url, config).then(function (res) { return res.json(); });
  }

  function loop() {
    page++;
    return fetchPage().then(function (response) {
      response.data.forEach(function (item) { versions.push(item); });
      if (response.data.length != 0) return loop();
    });
  }

  return loop().then(function () {
    return versions;
  });
}

function getCountriesWithVersion() {
  return Promise.resolve()
    .then(function () { return getVersions(); })
    .then(function (versions) {
      var countryIds = versions.reduce(function (array, version) {
        var countryId = version.attributes.country.data.id;
        if (!array.includes(countryId)) array.push(countryId);
        return array;
      }, []);
      var config = {};
      var query = qs.stringify({
        populate: ['regulation_state'],
        filters: { id: { $in: countryIds } },
      });
      var url = `${process.env.VUE_APP_STRAPI_URL}/api/countries?${query}`;
      return fetch(url, config);
    })
    .then(function (response) { return response.json(); })
    .then(function (response) {
      return {
        countries: response.data.map(function (item) {
          var regulationStateValue = !!item.attributes.regulation_state.data
            ? item.attributes.regulation_state.data.attributes.value
            : 'none';
          return {
            id: item.id,
            name: item.attributes.name,
            slug: item.attributes.slug,
            code: item.attributes.code,
            regulationStateValue: regulationStateValue,
          };
        })
      };
    });
}

export default getCountriesWithVersion;
