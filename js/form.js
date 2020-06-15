'use strict';

(function () {
  var sendAdvertForm = document.querySelector('.ad-form');
  var checkinSelect = sendAdvertForm.querySelector('#timein');
  var checkoutSelect = sendAdvertForm.querySelector('#timeout');
  var typeOfHouse = sendAdvertForm.querySelector('#type');
  var priceForNight = sendAdvertForm.querySelector('#price');

  checkinSelect.addEventListener('input', function () {
    checkoutSelect.value = checkinSelect.value;
  });

  checkoutSelect.addEventListener('input', function () {
    checkinSelect.value = checkoutSelect.value;
  });

  typeOfHouse.addEventListener('input', function () {
    var minimumPrice = window.data.houseData.HOUSE_MINIMAL_PRICES[typeOfHouse.value];

    priceForNight.min = minimumPrice;
    priceForNight.placeholder = minimumPrice;
  });
})();
