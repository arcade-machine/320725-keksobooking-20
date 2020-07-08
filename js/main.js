'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var sendAdvertForm = document.querySelector('.ad-form');

  var resetFormButton = sendAdvertForm.querySelector('.ad-form__reset');

  function activatePage() {
    window.data.isPageActive = true;

    window.formModule.activateForm();
    window.mainPinModule.setUpAddressLocation(window.data.isPageActive);

    window.pin.renderSimilarPins(
        window.pin.advertsToRender
    );

    resetFormButton.addEventListener('click', deactivatePage);
  }

  function deactivatePage() {
    window.data.isPageActive = false;

    window.formModule.deactivateForm();
    window.mainPinModule.setPinToDefaultStatus();
    window.mainPinModule.setUpAddressLocation(window.data.isPageActive);
    window.pin.removeSimilarPinsFromPage();

    resetFormButton.removeEventListener('click', deactivatePage);
  }

  sendAdvertForm.addEventListener('submit', function (evt) {
    var formData = new FormData(sendAdvertForm);

    window.backendModule.save(
        formData,
        function () {
          window.userMessages.renderSuccessMessage();
          deactivatePage();
        },
        function () {
          window.userMessages.renderFailMessage();
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
