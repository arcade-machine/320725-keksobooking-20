'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  function activatePage() {
    window.data.isPageActive = true;

    window.formModule.activateForm();
    window.mainPinModule.setUpAddressLocation(window.data.isPageActive);

    window.popup.renderSimilarAdverts(
        window.pin.pinsDocumentFragment
    );
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !window.data.isPageActive) {
      evt.preventDefault();
      activatePage();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && !window.data.isPageActive) {
      evt.preventDefault();
      activatePage();
    }
  });
})();
