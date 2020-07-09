'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var sendAdvertForm = document.querySelector('.ad-form');

  var avatarInput = sendAdvertForm.querySelector('#avatar');
  var defaultAvatarImage = sendAdvertForm.querySelector('.ad-form-header__preview img').cloneNode(true);

  var photoInput = sendAdvertForm.querySelector('#images');

  function resetPhotoPreviews() {
    var avatarPreview = sendAdvertForm.querySelector('.ad-form-header__preview');
    var photoPreview = sendAdvertForm.querySelector('.ad-form__photo');

    avatarPreview.innerHTML = '';
    photoPreview.innerHTML = '';

    avatarPreview.appendChild(defaultAvatarImage);
  }

  function setupPhotoInputListeners() {
    avatarInput.addEventListener('change', uploadFiles);
    photoInput.addEventListener('change', uploadFiles);
  }

  function removePhotoInputListeners() {
    avatarInput.removeEventListener('change', uploadFiles);
    photoInput.removeEventListener('change', uploadFiles);
  }

  function uploadFiles(evt) {
    var previewContainer;

    switch (evt.target) {
      case avatarInput:
        previewContainer = sendAdvertForm.querySelector('.ad-form-header__preview');
        break;
      case photoInput:
        previewContainer = sendAdvertForm.querySelector('.ad-form__photo');
        break;
    }

    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var ifMatches = FILE_TYPES.some(
        function (fileType) {
          return fileName.endsWith(fileType);
        }
    );

    if (ifMatches) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        var maximumImageWidth = previewContainer.clientWidth;
        var maximumImageHeight = previewContainer.clientHeight;

        var image = document.createElement('img');

        previewContainer.innerHTML = '';

        image.src = fileReader.result;
        image.width = maximumImageWidth;
        image.height = maximumImageHeight;

        previewContainer.appendChild(image);
      });

      fileReader.readAsDataURL(file);
    }
  }

  window.uploadModule = {
    setupPhotoInputListeners: setupPhotoInputListeners,
    removePhotoInputListeners: removePhotoInputListeners,
    resetPhotoPreviews: resetPhotoPreviews
  };
})();
