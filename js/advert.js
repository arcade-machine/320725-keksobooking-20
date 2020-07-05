'use strict';

(function () {
  var similarAdverts = [];

  function setupAdvert() {
    var advert = {
      'author': {},
      'offer': {},
      'location': {}
    };

    setupAuthor(advert);
    setupLocation(advert);
    setupOffer(advert);

    similarAdverts.push(advert);
  }

  function setupAuthor(advert) {
    var authorImage = window.utils.getRandomArrayItem(
        window.data.advertData.IMAGES_PATHS
    );
    window.utils.removeItemFromArray(
        authorImage,
        window.data.advertData.IMAGES_PATHS
    );

    advert.author.avatar = 'img/avatars/user' + authorImage + '.png';
  }

  function setupLocation(advert) {
    var location = advert.location;
    location.x = window.utils.getRandomArbitrary(
        window.data.mapData.MINIMUM_X_VALUE,
        window.data.mapData.MAXIMUM_X_VALUE
    );
    location.y = window.utils.getRandomArbitrary(
        window.data.mapData.MINIMUM_Y_VALUE,
        window.data.mapData.MAXIMUM_Y_VALUE
    );
  }

  function setupOffer(advert) {
    var offer = advert.offer;
    var locationX = Math.floor(advert.location.x);
    var locationY = Math.floor(advert.location.y);
    offer.title = 'Заголовок предложения';
    offer.address = locationX + ', ' + locationY;
    offer.type = window.utils.getRandomArrayItem(
        window.data.houseData.HOUSE_TYPES
    );
    offer.rooms = Math.floor(
        window.utils.getRandomArbitrary(1, 4)
    );
    offer.guests = Math.floor(
        window.utils.getRandomArbitrary(1, 4)
    );
    offer.price = Math.floor(
        window.utils.getRandomArbitrary(1000, 50000)
    );
    offer.checkin = window.utils.getRandomArrayItem(
        window.data.advertData.CHECKIN_CHECKOUT_TIME
    );
    offer.checkout = window.utils.getRandomArrayItem(
        window.data.advertData.CHECKIN_CHECKOUT_TIME
    );
    offer.features = window.utils.shuffleAndReturnArray(
        window.data.advertData.FEATURES_LIST,
        window.data.advertData.FEATURES_LIST.length
    );
    offer.description = 'Строка с описанием';
    offer.photos = window.utils.shuffleAndReturnArray(
        window.data.advertData.PHOTOS_LIST,
        window.data.advertData.PHOTOS_LIST.length
    );
  }

  for (var i = 0; i < window.data.advertData.ADVERT_AMOUNT; i++) {
    setupAdvert();
  }

  window.advert = {
    similarAdverts: similarAdverts
  };
})();
