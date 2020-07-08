'use strict';

(function () {
  var cityMap = document.querySelector('.map');
  var mainPin = cityMap.querySelector('.map__pin--main');
  var sendAdvertForm = document.querySelector('.ad-form');
  var addressInput = sendAdvertForm.querySelector('#address');

  var defaultTopPosition = mainPin.offsetTop;
  var defaultLeftPosition = mainPin.offsetLeft;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startingCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(mouseMove) {
      mouseMove.preventDefault();

      var movingCoordinates = {
        x: startingCoordinates.x - mouseMove.clientX,
        y: startingCoordinates.y - mouseMove.clientY
      };

      startingCoordinates = {
        x: mouseMove.clientX,
        y: mouseMove.clientY
      };

      var pinTopCoordinates = mainPin.offsetTop - movingCoordinates.y;
      var pinLeftCoordinates = mainPin.offsetLeft - movingCoordinates.x;

      if (pinTopCoordinates <= window.data.mapData.MINIMUM_Y_VALUE) {
        pinTopCoordinates = window.data.mapData.MINIMUM_Y_VALUE;
      } else if (pinTopCoordinates >= window.data.mapData.MAXIMUM_Y_VALUE) {
        pinTopCoordinates = window.data.mapData.MAXIMUM_Y_VALUE;
      }

      mainPin.style.top = pinTopCoordinates + 'px';
      mainPin.style.left = pinLeftCoordinates + 'px';

      window.mainPinModule.setUpAddressLocation(true);
    }

    function onMouseUp(mouseUp) {
      mouseUp.preventDefault();

      mainPin.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    mainPin.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function setUpAddressLocation(isPageActive) {
    var leftPosition = mainPin.offsetLeft;
    var topPosition = mainPin.offsetTop;

    var addressX = Math.floor(leftPosition + mainPin.clientWidth / 2);
    var addressY = isPageActive
      ? Math.floor(topPosition + mainPin.clientHeight + window.data.pinPointHeight)
      : Math.floor(topPosition + mainPin.clientHeight / 2);

    addressInput.value = addressX + ', ' + addressY;
  }

  function setPinToDefaultStatus() {
    mainPin.style.top = defaultTopPosition + 'px';
    mainPin.style.left = defaultLeftPosition + 'px';
  }

  setUpAddressLocation(false);

  window.mainPinModule = {
    setUpAddressLocation: setUpAddressLocation,
    setPinToDefaultStatus: setPinToDefaultStatus
  };
})();
