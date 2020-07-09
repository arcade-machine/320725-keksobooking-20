'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');

  function setupOrRemoveEventsForForm() {
    if (window.dataModule.isPageActive) {
      filterForm.addEventListener('change', setupEvents);
      return;
    }
    filterForm.removeEventListener('change', setupEvents);
  }

  function setupEvents() {
    var formGuestInput = filterForm.elements.namedItem('housing-guests');
    var formTypeInput = filterForm.elements.namedItem('housing-type');
    var formRoomsInput = filterForm.elements.namedItem('housing-rooms');
    var formPriceInput = filterForm.elements.namedItem('housing-price');

    var formFeaturesFieldset = filterForm.elements.namedItem('housing-features');
    var formFeaturesInput = formFeaturesFieldset.querySelectorAll('input[name="features"]');

    var filteredArray = window.pinModule.similarAdverts.slice();

    window.pinModule.removeSimilarPinsFromPage();

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
            filteredArray = filterFeaturesInput(filteredArray, feature.value);
          }
          return filteredArray;
        }
    );

    window.popupModule.clearDOMFromPopup();

    if (filteredArray.length >= window.dataModule.maxAdverts) {
      window.pinModule.advertsToRender = window.utilsModule.shuffleAndReturnArray(
          filteredArray,
          window.dataModule.maxAdverts
      );
    } else {
      window.pinModule.advertsToRender = filteredArray;
    }

    window.pinModule.renderSimilarPins(window.pinModule.advertsToRender);
  }

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

  function filterFeaturesInput(array, value) {
    return array.filter(
        function (item) {
          return item.offer.features.includes(value);
        }
    );
  }

  function filterPriceSelect(input, array) {
    var filteredArray = array.slice();

    switch (input.value) {
      case 'middle':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price >= window.dataModule.houseData.HOUSE_PRICE_RANGE.middle &&
                item.offer.price <= window.dataModule.houseData.HOUSE_PRICE_RANGE.high;
            }
        );
        break;
      case 'low':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price < window.dataModule.houseData.HOUSE_PRICE_RANGE.middle;
            }
        );
        break;

      case 'high':
        filteredArray = filteredArray.filter(
            function (item) {
              return item.offer.price > window.dataModule.houseData.HOUSE_PRICE_RANGE.high;
            }
        );
        break;

      default:
        break;
    }

    return filteredArray;
  }

  window.filterModule = {
    setupOrRemoveEventsForForm: setupOrRemoveEventsForForm
  };
})();
