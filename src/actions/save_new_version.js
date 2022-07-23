import getLoggedInUser from './get_logged_in_user';
import getLocales from './get_locales_without_i18n_fields';
import getCountryAndLocales from './get_country_and_locales';

function addVersion(params) {
  var oldNumber = params.latestVersion ? params.latestVersion.number : '0';
  var newNumber = parseInt(oldNumber, 10) + 1;

  var config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      data: {
        number: newNumber.toString(),
        content: params.content,
        locale: params.localeId,
        country: params.countryId,
        users_permissions_user: params.loggedInUserId,
      }
    })
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/versions`;
  return fetch(url, config).then(function (res) { return res.json(); })
}

/***/

function loadLocales(payload) {
  return getLocales().then(function (response) {
    payload.locales = response.locales;
    return payload;
  });
}

function loadLoggedInUser(payload) {
  return getLoggedInUser()
    .then(function (response) {
      payload.loggedInUser = response.user;
      return payload;
    });
}

function loadCountry(payload) {
  return getCountryAndLocales({ id: payload.countryId })
    .then(function (response) {
      payload.country = response.country;
      return payload;
    })
    .catch(function () {
      return Promise.reject(['country invalid']);
    });
}

function addVersions(payload) {
  var promises = payload.country.locales.map(function (locale) {
    return addVersion({
      latestVersion: locale.latestVersion,
      localeId: locale.id,
      content: payload.contents[locale.id],
      countryId: payload.country.id,
      loggedInUserId: payload.loggedInUser.id,
    });
  });
  return Promise.all(promises).then(function () {
    return payload;
  });
}

function updateCountry(payload) {
  var config = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      data: {
        regulation_state: payload.regulationStateId
      }
    })
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/countries/${payload.countryId}`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function () { return payload; });
}

function validateVersions(payload) {
  return new Promise(function (ok, fail) {
    var contents = [], valid = true;
    payload.locales.forEach(function (locale) {
      contents.push(payload.contents[locale.id]);
    });
    contents.forEach(function (content) { if (!content) { valid = false; } });
    return valid ? ok(payload) : fail([ 'all locales are required' ]);
  });
}

function saveNewVersion(params) {
  var payload = {
    localeId: params.localeId,
    countryId: params.countryId,
    regulationStateId: params.regulationStateId,
    content: params.content,
    contents: params.contents,
  };
  return Promise.resolve(payload)
    .then(loadLoggedInUser)
    .then(loadLocales)
    .then(loadCountry)
    .then(updateCountry)
    .then(validateVersions)
    .then(addVersions)
}

export default saveNewVersion;
