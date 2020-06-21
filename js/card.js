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

      mainPin.style.top = (mainPin.offsetTop - movingCoordinates.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - movingCoordinates.x) + 'px';
    }

    function onMouseUp(mouseUp) {
      mouseUp.preventDefault();

      mainPin.removeEventListener('mousemove', onMouseMove);
      mainPin.removeEventListener('mouseup', onMouseUp);
    }

    mainPin.addEventListener('mousemove', onMouseMove);
    mainPin.addEventListener('mouseup', onMouseUp);
  });
})();
