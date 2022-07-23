import qs from 'qs';
import getCountry from './get_country';
import getLocales from './get_locales_without_i18n_fields';

function loadCountry(payload) {
  var params = { slug: payload.slug, id: payload.id };
  return getCountry(params).then(function (response) {
    payload.country = response.country;
    return payload;
  });
}

function loadLocales(payload) {
  return getLocales().then(function (response) {
    payload.locales = response.locales;
    return payload;
  });
}

function getLastVersionForLocale(params) {
  var query = qs.stringify({
    populate: '*',
    sort: ['number:desc'],
    filters: {
      country: { id: { $eq: params.countryId } },
      locale: { id: { $eq: params.localeId } },
    },
    pagination: { pageSize: 1, page: 0 },
  });
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/versions?${query}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      var versions = response.data.map(function (item) {
        var author = !!item.attributes.users_permissions_user.data
          ? item.attributes.users_permissions_user.data.attributes.username
          : '';
        return {
          id: item.id,
          number: item.attributes.number,
          date: item.attributes.createdAt,
          author: author,
          content: item.attributes.content,
          localeId: params.localeId,
        };
      });
      return versions[0];
    });
}

function loadVersions(payload) {
  var promises = payload.locales.map(function (locale) {
    return getLastVersionForLocale({
      localeId: locale.id,
      countryId: payload.country.id,
    });
  });
  return Promise.all(promises).then(function (latestVersions) {
    payload.versions = latestVersions;
    return payload;
  });
}

function presentCountryAndVersions(payload) {
  payload.versions.forEach(function (version) {
    payload.locales.forEach(function (locale) {
      if (!version || locale.id != version.localeId) return;
      Object.assign(locale, { latestVersion: version });
    });
  });
  var result = {
    country: Object.assign({}, payload.country, {
      locales: payload.locales
    })
  };
  return result;
}

function getCountryAndLocales(params) {
  return Promise.resolve({
    id: params.id,
    slug: params.slug,
  })
    .then(loadCountry)
    .then(loadLocales)
    .then(loadVersions)
    .then(presentCountryAndVersions);
}

export default getCountryAndLocales;
