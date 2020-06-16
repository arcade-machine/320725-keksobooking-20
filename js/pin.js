'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin');
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

  window.advert.similarAdverts.forEach(
      function (advert) {
        renderPin(advert);
      }
  );

  window.pin = {
    pinsDocumentFragment: pinsDocumentFragment
  };
})();
