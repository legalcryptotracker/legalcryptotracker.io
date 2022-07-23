import qs from 'qs';

var cache;

function getPage(page) {
  var query = qs.stringify({
    populate: ['regulation_state'],
    sort: ['name:asc'],
    pagination: { pageSize: 100, page: page },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/countries?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      return response.data.map(function (item) {
        return { id: item.id, ...item.attributes };
      });
    });
}

function getCountries() {
  if (!!cache) return Promise.resolve(cache);

  var countries = []
    , page = 0;

  function loop() {
    page = page+1;
    return getPage(page).then(function (response) {
      countries = countries.concat(response);
      if (response.length > 0) return loop();
    });
  }

  return loop().then(function (response) {
    cache = { countries: countries };
    return cache;
  });
}

export default getCountries;
