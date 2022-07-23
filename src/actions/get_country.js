import qs from 'qs';

function notFound() {
  return Promise.reject();
}

function getCountry(params) {
  var filters = {};

  if (!params.slug && !params.id) return notFound();
  if (params.slug) filters.slug = { $eq: params.slug };
  if (params.id)   filters.id = { $eq: params.id };

  var query = qs.stringify({
    populate: '*',
    filters: filters,
    pagination: { pageSize: 1, page: 1 },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/countries?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      var countries = response.data.map(function (item) {
        var regulationStateId = !!item.attributes.regulation_state.data
          ? item.attributes.regulation_state.data.id
          : null;
        return {
          id: item.id,
          name: item.attributes.name,
          slug: item.attributes.slug,
          regulationStateId: regulationStateId,
          // ...item.attributes
        };
      });
      if (!countries.length) return notFound();
      return { country: countries[0] };
    });
};

export default getCountry;
