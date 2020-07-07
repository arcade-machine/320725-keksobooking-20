'use strict';

(function () {
  var cityMap = document.querySelector('.map');

  var houseData = {
    HOUSE_TYPES: [
      {'palace': 'Дворец'},
      {'flat': 'Квартира'},
      {'house': 'Дом'},
      {'bungalo': 'Бунгало'}
    ],
    HOUSE_MINIMAL_PRICES: {
      palace: 10000,
      flat: 1000,
      house: 5000,
      bungalo: 0
    }
  };

  var mapData = {
    MINIMUM_Y_VALUE: 130,
    MAXIMUM_Y_VALUE: 630,
    MAXIMUM_X_VALUE: cityMap.clientWidth,
    MINIMUM_X_VALUE: 0
  };

  var advertData = {
    ADVERT_AMOUNT: 8,
    IMAGES_PATHS: ['01', '02', '03', '04', '05', '06', '07', '08'],
    FEATURES_LIST: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    CHECKIN_CHECKOUT_TIME: ['12:00', '13:00', '14:00'],
    PHOTOS_LIST: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  var isPageActive = false;
  var MAXIMUM_ADVERTS_AMOUNT_ON_PAGE = 5;
  var PIN_POINT_HEIGHT = 16;

  window.data = {
    houseData: houseData,
    mapData: mapData,
    advertData: advertData,
    isPageActive: isPageActive,
    maxAdverts: MAXIMUM_ADVERTS_AMOUNT_ON_PAGE,
    pinPointHeight: PIN_POINT_HEIGHT
  };
})();
