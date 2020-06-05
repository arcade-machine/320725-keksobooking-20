'use strict';

var cityMap = document.querySelector('.map');

var MINIMUM_Y_VALUE = 130;
var MAXIMUM_Y_VALUE = 630;
var MAXIMUM_X_VALUE = cityMap.clientWidth;

var IMAGES_PATHS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var similarAdverts = [];

function getRandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function removeItemFromArray(item, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === item) {
      array.splice(i, 1);
      i--;
    }
  }
}

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
  var authorImage = getRandomArrayItem(IMAGES_PATHS);
  removeItemFromArray(authorImage, IMAGES_PATHS);

  advert.author.avatar = 'img/avatars/user' + authorImage + '.png';
}

function setupLocation(advert) {
  var location = advert.location;
  location.x = getRandomArbitrary(0, MAXIMUM_X_VALUE);
  location.y = getRandomArbitrary(MINIMUM_Y_VALUE, MAXIMUM_Y_VALUE);
}

function setupOffer(advert) {
  var offer = advert.offer;
  var locationX = Math.floor(advert.location.x);
  var locationY = Math.floor(advert.location.y);
  offer.title = 'Заголовок предложения';
  offer.address = locationX + ' ' + locationY;
}

setupAdvert();
cityMap.classList.remove('map--faded');
