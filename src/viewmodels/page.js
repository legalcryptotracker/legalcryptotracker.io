import withLayout from './mixins/with_layout';
import withObserver from './mixins/with_observer';
import getPageSlug from '@/actions/get_page_slug';
import getPage from '@/actions/get_page';
import router from '@/router';

function PageViewmodel() {
  var vm = {};
  var page;

  withObserver(vm);
  withLayout(vm);

  vm.observeLocale(function () {
    var slug = getPageSlug();
    var locale = vm.getActiveLocale();
    getPage({ slug: slug, localeId: locale.id })
      .then(function (response) {
        page = response.page;
        vm.notifyAll();
      })
      .catch(function () {
        router.replace({ path: '/404' });
      });
  });

  vm.getPage = function () { return page; };

  return vm;
}

export default PageViewmodel;
