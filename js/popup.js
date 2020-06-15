'use strict';

(function () {
  var cityMap = document.querySelector('.map');
  var pinsMap = cityMap.querySelector('.map__pins');
  var mapFiltersContainer = cityMap.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card');

  var popupDocumentFragment = new DocumentFragment();


  function renderPopup(advert) {
    clearDOMFromPopup();

    var renderPopupTemplate = cardTemplate.content.cloneNode(true);
    var popupTitle = renderPopupTemplate.querySelector('.popup__title');
    var popupPrice = renderPopupTemplate.querySelector('.popup__text--price');
    var popupCloseButton = renderPopupTemplate.querySelector('.popup__close');
    var popupAddress = renderPopupTemplate.querySelector('.popup__text--address');
    var popupType = renderPopupTemplate.querySelector('.popup__type');
    var popupCapacity = renderPopupTemplate.querySelector('.popup__text--capacity');
    var popupTime = renderPopupTemplate.querySelector('.popup__text--time');
    var popupFeatures = renderPopupTemplate.querySelector('.popup__features');
    popupFeatures.innerHTML = ''; // clearing parent out of children's
    var popupDescription = renderPopupTemplate.querySelector('.popup__description');
    var popupPhotos = renderPopupTemplate.querySelector('.popup__photos');
    popupPhotos.innerHTML = ''; // clearing parent out of children's
    var popupAvatar = renderPopupTemplate.querySelector('.popup__avatar');

    popupTitle.innerHTML = advert.offer.title;
    popupPrice.innerHTML = advert.offer.price + '₽/ночь';
    popupAddress.innerHTML = advert.offer.address;
    popupType.innerHTML = Object.values(advert.offer.type);
    popupCapacity.innerHeight = advert.offer.rooms + ' комнаты для' + advert.offer.guests + ' гостей';
    popupTime.innerHTML = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    renderFeaturesForPopup(popupFeatures, advert.offer.features);
    popupDescription.innerHTML = advert.offer.description;
    renderAdvertPhotos(popupPhotos, advert.offer.photos);
    popupAvatar.src = advert.author.avatar;

    popupCloseButton.addEventListener('click', clearDOMFromPopup);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        clearDOMFromPopup();
      }
    });

    popupDocumentFragment.appendChild(renderPopupTemplate);
    mapFiltersContainer.appendChild(popupDocumentFragment);
  }

  function clearDOMFromPopup() {
    mapFiltersContainer.innerHTML = '';
  }

  function renderFeaturesForPopup(featureList, advertFeatureList) {
    var featureListFragment = new DocumentFragment();

    advertFeatureList.forEach(
        function (feature) {
          var featureItem = document.createElement('li');
          featureItem.className = 'popup__feature popup__feature--' + feature;
          featureListFragment.appendChild(featureItem);
        }
    );
    featureList.appendChild(featureListFragment);
  }

  function renderAdvertPhotos(photosList, advertPhotosList) {
    var photosListFragment = new DocumentFragment();
    advertPhotosList.forEach(
        function (photo) {
          var photoImage = document.createElement('img');
          photoImage.className = 'popup__photo';
          photoImage.width = 45;
          photoImage.height = 40;
          photoImage.src = photo;
          photosListFragment.appendChild(photoImage);
        }
    );
    photosList.appendChild(photosListFragment);
  }

  function renderSimilarAdverts(fragment) {
    pinsMap.appendChild(fragment);
  }

  window.popup = {
    renderPopup: renderPopup,
    renderSimilarAdverts: renderSimilarAdverts
  };
})();

