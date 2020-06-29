'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var successPopupTemplate = document.querySelector('#success').content.cloneNode(true);
  var errorPopupTemplate = document.querySelector('#error').content.cloneNode(true);

  function renderSuccessMessage() {
    var successPopup = successPopupTemplate.querySelector('.success');

    mainContainer.appendChild(successPopup);

    successPopup.addEventListener('click', function () {
      successPopup.parentNode.removeChild(successPopup);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        successPopup.parentNode.removeChild(successPopup);
      }
    });
  }

  function renderFailMessage() {
    var errorPopup = errorPopupTemplate.querySelector('.error');

    mainContainer.appendChild(errorPopup);

    errorPopup.addEventListener('click', function () {
      errorPopup.parentNode.removeChild(errorPopup);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        errorPopup.parentNode.removeChild(errorPopup);
      }
    });
  }

  window.userMessages = {
    renderSuccessMessage: renderSuccessMessage,
    renderFailMessage: renderFailMessage
  };
})();


