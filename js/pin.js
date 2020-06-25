'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin');
  var similarAdverts = [];

  var pinsDocumentFragment = new DocumentFragment();

  function renderPin(advert) {
    var pinTemplateForeRender = pinTemplate.content.cloneNode(true);
    var pinButton = pinTemplateForeRender.querySelector('.map__pin');
    var avatarImage = pinTemplateForeRender.querySelector('img');

    pinButton.style.left = advert.location.x - pinButton.clientWidth / 2 + 'px';
    pinButton.style.top = advert.location.y - pinButton.clientHeight + 'px';
    avatarImage.src = advert.author.avatar;
    avatarImage.alt = advert.offer.title;
    pinsDocumentFragment.appendChild(pinTemplateForeRender);

    pinButton.addEventListener('click', function () {
      window.popup.renderPopup(advert);
    });
  }

  function getSimilarAdverts(data) {
    similarAdverts = data;

    similarAdverts.forEach(
        function (advert) {
          renderPin(advert);
        }
    );
  }

  function setupSimilarAdverts() {
    similarAdverts = window.advert.similarAdverts;

    similarAdverts.forEach(
        function (advert) {
          renderPin(advert);
        }
    );
  }

  window.backendModule.load(
      getSimilarAdverts,
      setupSimilarAdverts
  );

  window.pin = {
    pinsDocumentFragment: pinsDocumentFragment
  };
})();
