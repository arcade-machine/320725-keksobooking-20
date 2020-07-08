'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var sendAdvertForm = document.querySelector('.ad-form');

  var avatarInput = sendAdvertForm.querySelector('#avatar');
  var avatarPreview = sendAdvertForm.querySelector('.ad-form-header__preview img');

  var photoInput = sendAdvertForm.querySelector('#images');
  var photoPreview = sendAdvertForm.querySelector('.ad-form__photo');

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var ifMatches = FILE_TYPES.some(
        function (fileType) {
          return fileName.endsWith(fileType);
        }
    );

    if (ifMatches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        avatarPreview.src = fileReader.result;
      });

      fileReader.readAsDataURL(file);
    }
  });

  photoInput.addEventListener('change', function () {
    var file = photoInput.files[0];
    var fileName = file.name.toLowerCase();

    var ifMatches = FILE_TYPES.some(
        function (fileType) {
          return fileName.endsWith(fileType);
        }
    );

    if (ifMatches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        var image = document.createElement('img');
        var maximumImageWidth = photoPreview.clientWidth;
        var maximumImageHeight = photoPreview.clientHeight;

        image.src = fileReader.result;
        image.width = maximumImageWidth;
        image.height = maximumImageHeight;
        photoPreview.appendChild(image);
      });

      fileReader.readAsDataURL(file);
    }
  });

})();
