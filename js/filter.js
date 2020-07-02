'use strict';

(function () {
  function filterForSelect(select, array, filteredProperty) {
    var filteredArray = [];

    filteredArray = array.slice();

    filteredArray.filter(
        function (item) {
          return item[filteredProperty];
        }
    );
  }

  window.filterModule = {
    filterForSelect: filterForSelect
  };
})();
