(function (doc) {
  "use strict";

  function DOM(name) {
    this.element = doc.querySelectorAll(name);
  }

  var $a = new DOM('[data-js="link"]');

  DOM.prototype.get = function () {
    var newArray = Array.prototype.map.call(this.element, function (element) {
      return element;
    });
    return newArray;
  };

  DOM.prototype.off = function (event, callback) {
    Array.prototype.forEach.call(this.element, function (button) {
      console.log(button);
      button.removeEventListener(event, callback);
    });
  };

  DOM.prototype.on = function (event, callback) {
    Array.prototype.forEach.call(this.element, function (button) {
      console.log(button);
      button.addEventListener(event, callback, false);
    });
  };

  DOM.prototype.forEach = function () {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function () {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function () {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRigth = function () {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function () {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function () {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.prototype.filter = function () {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  function verifyTypeObject(obj) {
    return Object.prototype.toString.call(obj);
  }

  DOM.isArray = function (arr) {
    return verifyTypeObject(arr) === "[object Array]";
  };

  DOM.isObject = function (arr) {
    return verifyTypeObject(arr) === "[object Object]";
  };

  DOM.isFunction = function (arr) {
    return verifyTypeObject(arr) === "[object Function]";
  };

  DOM.isNumber = function (arr) {
    return verifyTypeObject(arr) === "[object Number]";
  };

  DOM.isString = function (arr) {
    return verifyTypeObject(arr) === "[object String]";
  };

  DOM.isBoolean = function (arr) {
    return verifyTypeObject(arr) === "[object Boolean]";
  };

  DOM.isNull = function (arr) {
    return (
      verifyTypeObject(arr) === "[object Null]" ||
      verifyTypeObject(arr) === "[object Undefined]"
    );
  };

  window.DOM = DOM;
})(document);
