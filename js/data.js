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

  var PIN_POINT_HEIGHT = 16;
  var isPageActive = false;
  var MAXIMUM_ADVERTS_AMOUNT_ON_PAGE = 5;

  window.dataModule = {
    houseData: houseData,
    mapData: mapData,
    isPageActive: isPageActive,
    maxAdverts: MAXIMUM_ADVERTS_AMOUNT_ON_PAGE,
    pinPointHeight: PIN_POINT_HEIGHT
  };
})();
