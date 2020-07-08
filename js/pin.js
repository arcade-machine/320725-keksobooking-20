'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin');
  var pinsMap = document.querySelector('.map__pins');

  var similarAdverts = [];
  var advertsToRender = [];

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

  function setupSimilarAdverts() {
    window.backendModule.load(
        setupAdvertsToRender,
        errorHandler
    );
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    node.style.color = 'white';
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function setupAdvertsToRender(data) {
    window.pin.similarAdverts = data;
    advertsToRender = window.utils.shuffleAndReturnArray(
        data,
        window.data.maxAdverts
    );

    renderSimilarPins(advertsToRender);
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

  window.pin = {
    removeSimilarPinsFromPage: removeSimilarPinsFromPage,
    renderSimilarPins: renderSimilarPins,
    setupSimilarAdverts: setupSimilarAdverts,
    similarAdverts: similarAdverts,
    advertsToRender: advertsToRender
  };
})();
