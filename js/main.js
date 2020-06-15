'use strict';

var cityMap = document.querySelector('.map');
var mainPin = cityMap.querySelector('.map__pin--main');
var mapFiltersContainer = cityMap.querySelector('.map__filters-container');
var mapFiltersForm = mapFiltersContainer.querySelector('.map__filters');

// --------------deactivate page-------------- //
var sendAdvertForm = document.querySelector('.ad-form');
var formFieldsets = sendAdvertForm.querySelectorAll('fieldset');
var filterSelects = mapFiltersForm.querySelectorAll('select');
var filtersFeatures = mapFiltersForm.querySelectorAll('fieldset');

formFieldsets.forEach(
    function (fieldset) {
      fieldset.disabled = true;
    }
);

filterSelects.forEach(
    function (select) {
      select.disabled = true;
    }
);

filtersFeatures.forEach(
    function (feature) {
      feature.disabled = true;
    }
);

var addressInput = sendAdvertForm.querySelector('#address');
addressInput.disabled = true;

function setUpAddressLocation(isActive) {
  var PIN_POINT_HEIGHT = 16;

  var leftPosition = mainPin.offsetLeft;
  var topPosition = mainPin.offsetTop;

  var addressX = Math.floor(leftPosition + mainPin.clientWidth / 2);
  var addressY = isActive
    ? Math.floor(topPosition + mainPin.clientHeight + PIN_POINT_HEIGHT)
    : Math.floor(topPosition + mainPin.clientHeight / 2);

  addressInput.value = addressX + ', ' + addressY;
}

setUpAddressLocation(false);

// --------------activate page-------------- //

function activateForm() {
  cityMap.classList.remove('map--faded');
  sendAdvertForm.classList.remove('ad-form--disabled');

  formFieldsets.forEach(
      function (fieldset) {
        fieldset.disabled = false;
      }
  );

  filterSelects.forEach(
      function (select) {
        select.disabled = false;
      }
  );

  filtersFeatures.forEach(
      function (feature) {
        feature.disabled = false;
      }
  );
}

function activatePage() {
  activateForm();
  setUpAddressLocation(true);

  window.popup.renderSimilarAdverts(
      window.pin.pinsDocumentFragment
  );
}

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
});
