import router from '@/router';
import getCountrySlug from '@/actions/get_country_slug.js';
import getCountryVersionSlug from '@/actions/get_country_version_slug.js';
import getCountryAndVersions from '@/actions/get_country_and_versions.js';
import getCountryAndLocales from '@/actions/get_country_and_locales.js';

function withCountry(vm) {
  var country;
  var countryAndLocales;

  vm.getCountry = function () { return country; };
  vm.getCountryAndLocales = function () { return countryAndLocales; };

  vm.getLatestVersion = function () {
    if (!country) return null;
    var latest, selected = getCountryVersionSlug();
    if (!selected) country.versions.forEach(function (version) {
      if (!latest || version.id > latest.id) latest = version;
    });
    else country.versions.forEach(function (version) {
        if (version.number == selected) latest = version;
    });
    return latest;
  };

  vm.getSelectedVersion = function () { return getCountryVersionSlug(); };

  vm.loadVersion = function (version) {
    var url = `/country/${country.slug}/version/${version.number}`;
    router.push({ path: url });
    // NOTE: Vue doesn't trigger a URL change if the same URL is matched, for
    // example /version/1 and /version/2. So we need to notify.
    setTimeout(function () { vm.notifyAll(); }, 100);
  };

  vm.getSortedVersions = function () {
    if (!country) return [];
    return country.versions.sort(function (a, b) { return a.id<b.id?1:-1; });
  };

  vm.observeLocale(function () {
    var slug = getCountrySlug();
    var locale = vm.getActiveLocale();
    var params = { slug: slug, localeId: locale.id };
    getCountryAndVersions(params)
      .then(function (response) {
        country = response.country;
        vm.notifyAll();
      })
      .catch(function (error) {
        console.log('Could not load country.', error);
      });
    getCountryAndLocales(params)
      .then(function (response) {
        countryAndLocales = response.country;
        vm.notifyAll();
      })
  });
}

export default withCountry;
