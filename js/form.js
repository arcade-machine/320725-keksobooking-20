'use strict';

(function () {
  var sendAdvertForm = document.querySelector('.ad-form');
  var checkinSelect = sendAdvertForm.querySelector('#timein');
  var checkoutSelect = sendAdvertForm.querySelector('#timeout');
  var typeOfHouse = sendAdvertForm.querySelector('#type');
  var priceForNight = sendAdvertForm.querySelector('#price');
  var roomNumber = sendAdvertForm.querySelector('#room_number');
  var capacity = sendAdvertForm.querySelector('#capacity');

  var cityMap = document.querySelector('.map');
  var mapFiltersContainer = cityMap.querySelector('.map__filters-container');
  var mapFiltersForm = mapFiltersContainer.querySelector('.map__filters');
  var formFieldSets = sendAdvertForm.querySelectorAll('fieldset');
  var filterSelects = mapFiltersForm.querySelectorAll('select');
  var filtersFeatures = mapFiltersForm.querySelectorAll('fieldset');
  var addressInput = sendAdvertForm.querySelector('#address');

  var CAPACITY_OPTIONS = [
    {value: 0, text: 'не для гостей'},
    {value: 1, text: 'для 1 гостя'},
    {value: 2, text: 'для 2 гостей'},
    {value: 3, text: 'для 3 гостей'}
  ];

  disableOrActivateForm(true);
  renderCapacityOptions(+roomNumber.value);
  addressInput.readOnly = true;

  function setupEventsForAdvertFrom() {
    checkinSelect.addEventListener('input', function () {
      checkoutSelect.value = checkinSelect.value;
    });

    checkoutSelect.addEventListener('input', function () {
      checkinSelect.value = checkoutSelect.value;
    });

    typeOfHouse.addEventListener('input', function () {
      var minimumPrice = window.dataModule.houseData.HOUSE_MINIMAL_PRICES[typeOfHouse.value];

      priceForNight.min = minimumPrice;
      priceForNight.placeholder = minimumPrice;
    });

    roomNumber.addEventListener('input', function () {
      renderCapacityOptions(+roomNumber.value);
    });
  }

  function disableOrActivateForm(shouldItBeDisabled) {
    addressInput.disabled = shouldItBeDisabled;

    formFieldSets.forEach(
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

  function renderCapacityOptions(roomsCount) {
    var NOT_FOR_GUESTS_ROOMS_COUNT = 100;

    var availableOptions = CAPACITY_OPTIONS.filter(
        function (option) {
          if (roomsCount === NOT_FOR_GUESTS_ROOMS_COUNT) {
            return option.value === 0;
          }
          return option.value <= roomsCount && option.value !== 0;
        }
    );
    var optionsDocumentFragment = new DocumentFragment();

    availableOptions.forEach(
        function (option) {
          var optionElement = document.createElement('option');
          optionElement.value = option.value;
          optionElement.innerHTML = option.text;
          optionsDocumentFragment.appendChild(optionElement);
        }
    );

    capacity.innerHTML = '';
    capacity.appendChild(optionsDocumentFragment);
  }

  function activateForm() {
    cityMap.classList.remove('map--faded');
    sendAdvertForm.classList.remove('ad-form--disabled');
    sendAdvertForm.addEventListener('change', setupEventsForAdvertFrom);
    disableOrActivateForm(false);
  }

  function deactivateForm() {
    cityMap.classList.add('map--faded');
    sendAdvertForm.classList.add('ad-form--disabled');
    sendAdvertForm.reset();
    sendAdvertForm.removeEventListener('change', setupEventsForAdvertFrom);
    disableOrActivateForm(true);
  }

  window.formModule = {
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };
})();
