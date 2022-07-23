var qs = require('qs');

var cache;

function getRegulationStates(params) {
  if (!!cache) return Promise.resolve(cache);

  var config = {};
  var query = qs.stringify({ sort: ['value:asc'], });
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/regulation-states?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      cache = {
        regulationStates: response.data.map(function (item) {
          return { id: item.id, ...item.attributes };
        })
      };
      return cache;
    });
}

export default getRegulationStates;
