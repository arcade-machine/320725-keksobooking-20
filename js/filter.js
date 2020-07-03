'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', function () {
    var formGuestInput = filterForm.elements.namedItem('housing-guests');
    var formTypeInput = filterForm.elements.namedItem('housing-type');
    var filteredArray = window.advert.similarAdverts.slice();

    if (formGuestInput.value !== 'any') {
      filteredArray = filteredArray.filter(
          function (item) {
            return item.offer.guests === Number(formGuestInput.value);
          }
      );
    } else {
      filteredArray = window.advert.similarAdverts.slice();
    }

    if (formTypeInput.value !== 'any') {
      filteredArray = filteredArray.filter(
          function (item) {
            return item.offer.type === formTypeInput.value;
          }
      );
    } else {
      filteredArray = window.advert.similarAdverts.slice();
    }

    console.log(filteredArray);

    // formInputs.forEach(
    //     function (input) {
    //       console.log(input.value);
    //     }
    // );
  });

  function filterForSelect(input, array, filteredProperty) {
    var filteredArray = array.slice;

    if (input.value !== 'any') {
      filteredArray = filteredArray.filter(
          function (item) {
            return item.offer[filteredProperty] === input.value;
          }
      );
    }

    return filteredArray;
  }

  window.filterModule = {
    filterForSelect: filterForSelect
  };
})();
