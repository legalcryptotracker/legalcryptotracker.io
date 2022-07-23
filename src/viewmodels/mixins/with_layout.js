import getLocales from '@/actions/get_locales';
import login from '@/actions/login';
import logout from '@/actions/logout';
import register from '@/actions/register';
import recoverPassword from '@/actions/recover_password';
import resetPassword from '@/actions/reset_password';
import getLoggedInUser from '@/actions/get_logged_in_user';
import setActiveLocale from '@/actions/set_active_locale';
import getActiveLocale from '@/actions/get_active_locale';
import getResetPasswordCode from '@/actions/get_reset_password_code';

function withLayout(vm) {
  var isLoginModalOpen = false;
  var isRegisterModalOpen = false;
  var isForgotPasswordModalOpen = false;

  var loginErrored;
  var resetPasswordErrored;
  var registerErrors;

  var loggedInUser;
  var locales = [];
  var activeLocale = {};
  var localeObservers = [];

  getLoggedInUser()
    .then(function (response) { loggedInUser = response.user; })
    .catch(function () { loggedInUser = null; })
    .then(function () { vm.notifyAll(); });

  getLocales().then(function (response) {
    locales = response.locales;
    vm.setActiveLocale(getActiveLocale() || locales[0].id);
  });

  function resetErrors() {
    loginErrored = false;
    registerErrors = [];
  }

  resetErrors();

  /***/

  vm.observeLocale = function (fn) { localeObservers.push(fn); };

  vm.getLoggedInUser = function () { return loggedInUser; };
  vm.getActiveLocale = function () { return activeLocale };
  vm.getLocales = function () { return locales; };
  vm.setActiveLocale = function (id) {
    activeLocale = locales.find(function (_) { return _.id == id; });
    setActiveLocale(activeLocale.id);
    localeObservers.forEach(function (observer) { observer(); });
    vm.notifyAll();
  };

  vm.isLoginModalOpen = function () { return isLoginModalOpen; };
  vm.isRegisterModalOpen = function () { return isRegisterModalOpen; };
  vm.isForgotPasswordModalOpen = function () { return isForgotPasswordModalOpen; };
  vm.isResetPasswordModalOpen = function () { return !!getResetPasswordCode(); };

  vm.openLoginModal = function () {
    vm.closeModals();
    isLoginModalOpen = true;
    vm.notifyAll();
  };
  vm.openRegisterModal = function () {
    vm.closeModals();
    isRegisterModalOpen = true;
    vm.notifyAll();
  };
  vm.openForgotPasswordModal = function () {
    vm.closeModals();
    isForgotPasswordModalOpen = true;
    vm.notifyAll();
  };

  vm.doLogin = function (data) {
    loginErrored = false;
    vm.notifyAll();
    login({
      email: data.email,
      password: data.password,
    })
      .then(function (response) {
        loggedInUser = response.user;
        vm.closeModals(); // NOTE: Includes notifyAll.
      })
      .catch(function () {
        loginErrored = true;
        vm.notifyAll();
      });
  };

  vm.doRegister = function (data) {
    register({
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then(function (response) {
        loggedInUser = response.user;
        vm.closeModals();
      })
      .catch(function (errors) {
        registerErrors = errors;
        vm.notifyAll();
      });
  };

  vm.doRecoverPassword = function (data) {
    var params = { email: data.email };
    recoverPassword(params).then(function () {
      vm.closeModals();
    });
  };

  vm.doResetPassword = function (data) {
    var params = {
      code: getResetPasswordCode(),
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };
    resetPassword(params)
      .then(function () {
        window.location.search = '';
      })
      .catch(function () {
        resetPasswordErrored = true;
        vm.notifyAll();
      });
  };

  vm.doLogout = function () {
    logout().then(function () {
      loggedInUser = null;
      vm.notifyAll();
    });
  };

  vm.closeModals = function () {
    isLoginModalOpen = false;
    isRegisterModalOpen = false;
    isForgotPasswordModalOpen = false;
    resetErrors();
    vm.notifyAll();
  };

  vm.didLoginError = function () { return loginErrored; };
  vm.didResetPasswordError = function () { return resetPasswordErrored; };
  vm.getRegisterErrors = function () { return registerErrors; };
}

export default withLayout;
