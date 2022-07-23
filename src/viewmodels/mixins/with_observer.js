function withObserver(vm) {
  vm.observers = [];

  vm.notify = function (observer) {
    observer(vm);
  };

  vm.notifyAll = function () {
    vm.observers.forEach(vm.notify);
  };

  vm.observe = function (fn) {
    vm.observers.push(fn);
    vm.notify(fn);
  };

  vm.stopObserving = function (fn) {
    vm.observers = vm.observers.filter(function (_) { return _ != fn; });
  };
}

export default withObserver;
