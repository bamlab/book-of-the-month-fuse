function bind(fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
}

module.exports = bind;
