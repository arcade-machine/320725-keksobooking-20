'use strict';

(function () {
  function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function removeItemFromArray(item, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === item) {
        array.splice(i, 1);
        i--;
      }
    }
  }

  function shuffleAndReturnArray(array, expectedLength) {
    var shuffled = array.slice().sort(
        function () {
          return 0.5 - Math.random();
        });

    return shuffled.slice(0, expectedLength);
  }

  function findObjectValue(object, value) {
    var missingObject = object.find(
        function (obj) {
          return obj[value];
        }
    );
    return Object.values(missingObject);
  }

  window.utils = {
    getRandomArrayItem: getRandomArrayItem,
    getRandomArbitrary: getRandomArbitrary,
    removeItemFromArray: removeItemFromArray,
    shuffleAndReturnArray: shuffleAndReturnArray,
    findObjectValue: findObjectValue
  };
})();
