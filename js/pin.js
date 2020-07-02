'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin');
  var pinsMap = document.querySelector('.map__pins');

  var similarAdverts = [];

  function renderPin(advert, fragment) {
    var pinTemplateForeRender = pinTemplate.content.cloneNode(true);
    var pinButton = pinTemplateForeRender.querySelector('.map__pin');
    var avatarImage = pinTemplateForeRender.querySelector('img');

    pinButton.style.left = advert.location.x - pinButton.clientWidth / 2 + 'px';
    pinButton.style.top = advert.location.y - pinButton.clientHeight + 'px';
    avatarImage.src = advert.author.avatar;
    avatarImage.alt = advert.offer.title;
    fragment.appendChild(pinTemplateForeRender);

    pinButton.addEventListener('click', function () {
      window.popup.renderPopup(advert);
    });
  }

  function getSimilarAdverts(data) {
    window.advert.similarAdverts = data;
  }

  function setupMockData() {
    similarAdverts = window.advert.similarAdverts;
  }

  function renderSimilarPins(adverts) {
    var pinsDocumentFragment = new DocumentFragment();

    adverts.forEach(
        function (advert) {
          renderPin(advert, pinsDocumentFragment);
        }
    );

    pinsMap.appendChild(pinsDocumentFragment);
  }

  function removeSimilarPinsFromPage() {
    var pinsOnTheMap = document.querySelectorAll('.map__pin');

    pinsOnTheMap.forEach(
        function (pin) {
          if (pin.classList.contains('map__pin--main')) {
            return;
          }
          pin.parentNode.removeChild(pin);
        }
    );
  }

  window.backendModule.load(
      getSimilarAdverts,
      setupMockData
  );

  window.pin = {
    removeSimilarPinsFromPage: removeSimilarPinsFromPage,
    renderSimilarPins: renderSimilarPins,
    similarAdverts: similarAdverts
  };
})();
