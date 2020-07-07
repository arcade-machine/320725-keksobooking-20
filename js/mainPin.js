'use strict';

(function () {
  var cityMap = document.querySelector('.map');
  var mainPin = cityMap.querySelector('.map__pin--main');
  var sendAdvertForm = document.querySelector('.ad-form');
  var addressInput = sendAdvertForm.querySelector('#address');

  function setUpAddressLocation(isPageActive) {
    var leftPosition = mainPin.offsetLeft;
    var topPosition = mainPin.offsetTop;

    var addressX = Math.floor(leftPosition + mainPin.clientWidth / 2);
    var addressY = isPageActive
      ? Math.floor(topPosition + mainPin.clientHeight + window.data.pinPointHeight)
      : Math.floor(topPosition + mainPin.clientHeight / 2);

    addressInput.value = addressX + ', ' + addressY;
  }

  setUpAddressLocation(false);

  window.mainPinModule = {
    setUpAddressLocation: setUpAddressLocation
  };
})();
