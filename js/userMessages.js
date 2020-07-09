'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var successPopupTemplate = document.querySelector('#success').content.cloneNode(true);
  var errorPopupTemplate = document.querySelector('#error').content.cloneNode(true);

  function renderSuccessMessage() {
    var successPopup = successPopupTemplate.querySelector('.success');

    function removePopupFromPage(evt) {
      if (evt.key === 'Escape') {
        successPopup.parentNode.removeChild(successPopup);
      }

      document.removeEventListener('keydown', removePopupFromPage);
      successPopup.removeEventListener('click', removePopupFromPage);
    }

    mainContainer.appendChild(successPopup);

    successPopup.addEventListener('click', removePopupFromPage);
    document.addEventListener('keydown', removePopupFromPage);
  }

  function renderFailMessage() {
    var errorPopup = errorPopupTemplate.querySelector('.error');

    mainContainer.appendChild(errorPopup);

    errorPopup.addEventListener('click', removePopupFromPage);

    function removePopupFromPage(evt) {
      if (evt.key === 'Escape' || evt.button === 0) {
        errorPopup.parentNode.removeChild(errorPopup);
      }

      document.removeEventListener('keydown', removePopupFromPage);
      errorPopup.removeEventListener('click', removePopupFromPage);
    }

    errorPopup.addEventListener('click', removePopupFromPage);
    document.addEventListener('keydown', removePopupFromPage);
  }

  window.userMessagesModule = {
    renderSuccessMessage: renderSuccessMessage,
    renderFailMessage: renderFailMessage
  };
})();


