import router from '@/router';
import withObserver from './mixins/with_observer.js';
import withLayout from './mixins/with_layout.js';
import getCountries from '@/actions/get_countries.js';
import getCountriesWithVersion from '@/actions/get_countries_with_version.js';
import getRegulationStates from '@/actions/get_regulation_states.js';

function DashboardViewmodel() {
  var vm = {};

  // TODO: These are just countries that have at least one version available.
  // Rename this variable to reflect that.
  var countries = []; 

  var allCountries = []; 
  var regulationStates = [];

  withObserver(vm);
  withLayout(vm);

  vm.getCountries = function () { return countries; };
  vm.getAllCountries = function () { return allCountries; };

  getRegulationStates().then(function (response) {
    regulationStates = response.regulationStates;
    vm.notifyAll();
  });

  getCountriesWithVersion().then(function (response) {
    countries = response.countries;
    vm.notifyAll();
  });

  getCountries().then(function (response) {
    allCountries = response.countries;
    vm.notifyAll();
  });

  vm.getRegulationStates = function () { return regulationStates; };

  vm.goToCountry = function (countrySlug) {
    router.push({ path: `/country/${countrySlug}` });
  };

  return vm;
};

export default DashboardViewmodel;
