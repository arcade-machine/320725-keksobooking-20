'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var sendAdvertForm = document.querySelector('.ad-form');

  function activatePage() {
    window.data.isPageActive = true;

    window.formModule.activateForm();
    window.mainPinModule.setUpAddressLocation(window.data.isPageActive);

    window.popup.renderSimilarAdverts(
        window.pin.pinsDocumentFragment
    );
  }

  function deactivatePage() {
    window.data.isPageActive = false;

    window.formModule.deactivateForm();
    window.mainPinModule.setUpAddressLocation(window.data.isPageActive);
  }

  sendAdvertForm.addEventListener('submit', function (evt) {
    var formData = new FormData(sendAdvertForm);

    window.backendModule.save(
        formData,
        function () {
          deactivatePage();
        }
    );

    evt.preventDefault();
  });

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
