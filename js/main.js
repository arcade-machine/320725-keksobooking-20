'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  function activatePage() {
    window.formModule.activateForm();
    window.mainPinModule.setUpAddressLocation(true);

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
})();
