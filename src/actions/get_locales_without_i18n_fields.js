import qs from 'qs';

function getLocales() {
  var query = qs.stringify({
    fields: ['id', 'name', 'flag'],
    pagination: { pageSize: 100, page: 0 },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/custom-locales?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      return {
        locales: response.data.map(function (item) {
          return { id: item.id, ...item.attributes };
        })
      };
    });
}

export default getLocales;
