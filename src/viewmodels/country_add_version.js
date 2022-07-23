import router from '@/router';
import withObserver from './mixins/with_observer';
import withLayout from './mixins/with_layout.js';
import withCountry from './mixins/with_country.js';
import getCountries from '@/actions/get_countries.js';
import getRegulationStates from '@/actions/get_regulation_states.js';
import saveNewVersion from '@/actions/save_new_version.js';
import getCountry from '@/actions/get_country.js';

function CountryAddVersionViewmodel() {
  var vm = {};
  var countries = [];
  var regulationStates = [];

  var saveNewVersionErrors = [];

  withObserver(vm);
  withLayout(vm);
  withCountry(vm);

  getCountries().then(function (response) {
    countries = response.countries;
    vm.notifyAll();
  });

  getRegulationStates().then(function (response) {
    regulationStates = response.regulationStates;
    vm.notifyAll();
  });

  vm.getCountries = function () { return countries; };
  vm.getRegulationStates = function () { return regulationStates; };
  vm.getSaveNewVersionErrors = function () { return saveNewVersionErrors; };

  vm.saveNewVersion = function (params) {
    var locale = vm.getActiveLocale();
    saveNewVersion({
      localeId: locale.id,
      countryId: params.countryId,
      regulationStateId: params.regulationStateId,
      content: params.content, // TODO: Remove
      contents: params.contents,
    })
      .then(function () {
        return getCountry({ id: params.countryId });
      })
      .then(function (response) {
        router.replace({ path: `/country/${response.country.slug}` });
      })
      .catch(function (errors) {
        saveNewVersionErrors = errors;
        vm.notifyAll();
      });
  };

  vm.cancelNewVersion = function () {
    var country = vm.getCountry();
    if (!country)
      router.replace({ path: '/' });
    else
      router.replace({ path: `/country/${country.slug}` });
  };

  return vm;
};

export default CountryAddVersionViewmodel;
