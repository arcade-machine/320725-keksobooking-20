'use strict';

var cityMap = document.querySelector('.map');
var pinsMap = cityMap.querySelector('.map__pins');
var mainPin = cityMap.querySelector('.map__pin--main');
var mapFiltersContainer = cityMap.querySelector('.map__filters-container');
var mapFiltersForm = mapFiltersContainer.querySelector('.map__filters');

var pinTemplate = document.querySelector('#pin');
var cardTemplate = document.querySelector('#card');

var popupDocumentFragment = new DocumentFragment();
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
    renderPopup(advert);
  });
}

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

window.advert.similarAdverts.forEach(
    function (advert) {
      renderPin(advert);
    }
);

// --------------deactivate page-------------- //
var sendAdvertForm = document.querySelector('.ad-form');
var formFieldsets = sendAdvertForm.querySelectorAll('fieldset');
var filterSelects = mapFiltersForm.querySelectorAll('select');
var filtersFeatures = mapFiltersForm.querySelectorAll('fieldset');

formFieldsets.forEach(
    function (fieldset) {
      fieldset.disabled = true;
    }
);

filterSelects.forEach(
    function (select) {
      select.disabled = true;
    }
);

filtersFeatures.forEach(
    function (feature) {
      feature.disabled = true;
    }
);

var addressInput = sendAdvertForm.querySelector('#address');
addressInput.disabled = true;

function setUpAddressLocation(isActive) {
  var PIN_POINT_HEIGHT = 16;

  var leftPosition = mainPin.offsetLeft;
  var topPosition = mainPin.offsetTop;

  var addressX = Math.floor(leftPosition + mainPin.clientWidth / 2);
  var addressY = isActive
    ? Math.floor(topPosition + mainPin.clientHeight + PIN_POINT_HEIGHT)
    : Math.floor(topPosition + mainPin.clientHeight / 2);

  addressInput.value = addressX + ', ' + addressY;
}

setUpAddressLocation(false);

// --------------activate page-------------- //

function activateForm() {
  cityMap.classList.remove('map--faded');
  sendAdvertForm.classList.remove('ad-form--disabled');

  formFieldsets.forEach(
      function (fieldset) {
        fieldset.disabled = false;
      }
  );

  filterSelects.forEach(
      function (select) {
        select.disabled = false;
      }
  );

  filtersFeatures.forEach(
      function (feature) {
        feature.disabled = false;
      }
  );
}

function activatePage() {
  activateForm();
  setUpAddressLocation(true);
  pinsMap.appendChild(pinsDocumentFragment);
}

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    activatePage();
  }
});
