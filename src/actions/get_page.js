import qs from 'qs';

function getPage(params) {
  var query = qs.stringify({
    filters: {
      slug: { $eq: params.slug },
      locale: { id: { $eq: params.localeId } },
    },
    pagination: { pageSize: 1, page: 0 },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/pages?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      if (!response.data) return Promise.reject();
      return {
        page: {
          id: response.data[0].id,
          ...response.data[0].attributes,
        }
      };
    });
}

export default getPage;
