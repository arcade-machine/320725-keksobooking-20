'use strict';

(function () {
  var sendAdvertForm = document.querySelector('.ad-form');
  var checkinSelect = sendAdvertForm.querySelector('#timein');
  var checkoutSelect = sendAdvertForm.querySelector('#timeout');
  var typeOfHouse = sendAdvertForm.querySelector('#type');
  var priceForNight = sendAdvertForm.querySelector('#price');

  var cityMap = document.querySelector('.map');
  var mapFiltersContainer = cityMap.querySelector('.map__filters-container');
  var mapFiltersForm = mapFiltersContainer.querySelector('.map__filters');
  var formFieldsets = sendAdvertForm.querySelectorAll('fieldset');
  var filterSelects = mapFiltersForm.querySelectorAll('select');
  var filtersFeatures = mapFiltersForm.querySelectorAll('fieldset');
  var addressInput = sendAdvertForm.querySelector('#address');

  addressInput.readOnly = true;

  checkinSelect.addEventListener('input', function () {
    checkoutSelect.value = checkinSelect.value;
  });

  checkoutSelect.addEventListener('input', function () {
    checkinSelect.value = checkoutSelect.value;
  });

  typeOfHouse.addEventListener('input', function () {
    var minimumPrice = window.data.houseData.HOUSE_MINIMAL_PRICES[typeOfHouse.value];

    priceForNight.min = minimumPrice;
    priceForNight.placeholder = minimumPrice;
  });

  function disableOrActivateForm(shouldItBeDisabled) {
    addressInput.disabled = shouldItBeDisabled;

    formFieldsets.forEach(
        function (fieldset) {
          fieldset.disabled = shouldItBeDisabled;
        }
    );

    filterSelects.forEach(
        function (select) {
          select.disabled = shouldItBeDisabled;
        }
    );

    filtersFeatures.forEach(
        function (feature) {
          feature.disabled = shouldItBeDisabled;
        }
    );
  }

  disableOrActivateForm(true);

  function activateForm() {
    cityMap.classList.remove('map--faded');
    sendAdvertForm.classList.remove('ad-form--disabled');
    disableOrActivateForm(false);
  }

  window.formModule = {
    activateForm: activateForm
  };
})();
