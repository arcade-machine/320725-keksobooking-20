'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var sendAdvertForm = document.querySelector('.ad-form');

  var resetFormButton = sendAdvertForm.querySelector('.ad-form__reset');

  function activatePage() {
    window.dataModule.isPageActive = true;

    window.formModule.activateForm();
    window.mainPinModule.setUpAddressLocation(window.dataModule.isPageActive);
    window.pinModule.setupSimilarAdverts();
    window.filterModule.setupOrRemoveEventsForForm();
    window.uploadModule.setupPhotoInputListeners();

    sendAdvertForm.addEventListener('submit', onSubmitForm);
    resetFormButton.addEventListener('click', deactivatePage);

    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onMainPinClick);
  }

  function deactivatePage() {
    window.dataModule.isPageActive = false;

    window.formModule.deactivateForm();
    window.mainPinModule.setPinToDefaultStatus();
    window.mainPinModule.setUpAddressLocation(window.dataModule.isPageActive);
    window.pinModule.removeSimilarPinsFromPage();
    window.filterModule.setupOrRemoveEventsForForm();
    window.uploadModule.removePhotoInputListeners();

    sendAdvertForm.removeEventListener('submit', onSubmitForm);
    resetFormButton.removeEventListener('click', deactivatePage);

    mainPin.addEventListener('mousedown', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinClick);
  }

  function onSubmitForm(evt) {
    var formData = new FormData(sendAdvertForm);

    window.backendModule.save(
        formData,
        function () {
          window.userMessagesModule.renderSuccessMessage();
          deactivatePage();
        },
        function () {
          window.userMessagesModule.renderFailMessage();
        }
    );

    evt.preventDefault();
  }

  function onMainPinClick(evt) {
    if (evt.button === 0 && !window.dataModule.isPageActive ||
      evt.key === 'Enter' && !window.dataModule.isPageActive) {
      evt.preventDefault();
      activatePage();
    }
  }

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinClick);
})();
