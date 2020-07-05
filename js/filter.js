'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  filterForm.addEventListener('change', function () {
    var formGuestInput = filterForm.elements.namedItem('housing-guests');
    var formTypeInput = filterForm.elements.namedItem('housing-type');
    var formRoomsInput = filterForm.elements.namedItem('housing-rooms');
    var formPriceInput = filterForm.elements.namedItem('housing-price');

    var formFeaturesFieldset = filterForm.elements.namedItem('housing-features');
    var formFeaturesInput = formFeaturesFieldset.querySelectorAll('input[name="features"]');

    var filteredArray = window.advert.similarAdverts.slice();

    window.pin.removeSimilarPinsFromPage();

    filteredArray = filterForSelect(
        formGuestInput,
        filteredArray,
        'guests'
    );

    filteredArray = filterPriceSelect(formPriceInput, filteredArray);

    filteredArray = filterForSelect(
        formTypeInput,
        filteredArray,
        'type'
    );

    filteredArray = filterForSelect(
        formRoomsInput,
        filteredArray,
        'rooms'
    );

    formFeaturesInput.forEach(
        function (feature) {
          if (feature.checked) {
            filteredArray = filteredArray.filter(
                function (item) {
                  return item.offer.features.includes(feature.value);
                }
            );
            return filteredArray;
          }
          return;
        }
    );

    window.popup.clearDOMFromPopup();

    if (filteredArray.length >= window.data.maxAdverts) {
      window.pin.advertsToRender = window.utils.shuffleAndReturnArray(
          filteredArray,
          window.data.maxAdverts
      );
    } else {
      window.pin.advertsToRender = filteredArray;
    }

    window.pin.renderSimilarPins(window.pin.advertsToRender);
  });

  function filterForSelect(input, array, filteredProperty) {
    var filteredArray = array.slice();

    if (input.value !== 'any') {
      filteredArray = filteredArray.filter(
          function (item) {
            return item.offer[filteredProperty].toString() === input.value;
          }
      );
    }

    return filteredArray;
  }

  function filterPriceSelect(input, array) {
    var filteredArray = array.slice();

    switch (input.value) {
      case 'middle':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price >= 10000 && item.offer.price <= 50000;
            }
        );
        break;
      case 'low':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price <= 10000;
            }
        );
        break;

      case 'high':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price >= 50000;
            }
        );
        break;

      default:
        break;
    }

    return filteredArray;
  }

  window.filterModule = {
    filterForSelect: filterForSelect
  };
})();
