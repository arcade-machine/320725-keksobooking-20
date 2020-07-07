'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

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

      var pinTopCoorditantes = mainPin.offsetTop - movingCoordinates.y;
      var pinLeftCoorditantes = mainPin.offsetLeft - movingCoordinates.x;

      if (pinTopCoorditantes <= window.data.mapData.MINIMUM_Y_VALUE) {
        pinTopCoorditantes = window.data.mapData.MINIMUM_Y_VALUE;
      } else if (pinTopCoorditantes >= window.data.mapData.MAXIMUM_Y_VALUE) {
        pinTopCoorditantes = window.data.mapData.MAXIMUM_Y_VALUE;
      }

      mainPin.style.top = pinTopCoorditantes + 'px';
      mainPin.style.left = pinLeftCoorditantes + 'px';

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
})();
