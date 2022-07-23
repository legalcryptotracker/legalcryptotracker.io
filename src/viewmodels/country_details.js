import withObserver from './mixins/with_observer';
import withLayout from './mixins/with_layout.js';
import withCountry from './mixins/with_country.js';

function CountryDetailsViewmodel() {
  var vm = {};

  withObserver(vm);
  withLayout(vm);
  withCountry(vm);

  return vm;
};

export default CountryDetailsViewmodel;
