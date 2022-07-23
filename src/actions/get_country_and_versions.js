import qs from 'qs';
import getCountry from './get_country';

function loadCountry(payload) {
  var params = { slug: payload.slug, id: payload.id };
  return getCountry(params).then(function (response) {
    payload.country = response.country;
    return payload;
  });
}

function loadVersions(payload) {
  var query = qs.stringify({
    populate: '*',
    sort: ['number:asc'],
    filters: {
      country: { id: { $eq: payload.country.id } },
      locale: { id: { $eq: payload.localeId } },
    },
    pagination: { pageSize: 10, page: 0 },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/versions?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      payload.versions = response.data.map(function (item) {
        var author = !!item.attributes.users_permissions_user.data
          ? item.attributes.users_permissions_user.data.attributes.username
          : '';
        return {
          id: item.id,
          number: item.attributes.number,
          date: item.attributes.createdAt,
          author: author,
          content: item.attributes.content,
        };
      });
      return payload;
    });
}

function presentCountryAndVersions(payload) {
  return {
    country: Object.assign({}, payload.country, {
      versions: payload.versions,
    })
  };
}

function getCountryAndVersions(params) {
  return Promise.resolve({
    id: params.id,
    slug: params.slug,
    localeId: params.localeId,
  })
    .then(loadCountry)
    .then(loadVersions)
    .then(presentCountryAndVersions);
}

export default getCountryAndVersions;
