(function () {
	var defaultTitle = 'Lotteria by Gruppo Sportivo Verallia Lonigo';
	var titleKey = 'lotteriaBrandingTitle';
	var logoKey = 'lotteriaBrandingLogo';
	var maxFileSize = 5 * 1024 * 1024;
	var maxLogoWidth = 60;
	var maxLogoHeight = 60;

	function readSetting(key) {
		try {
			return window.sessionStorage.getItem(key);
		} catch (error) {
			return null;
		}
	}

	function writeSetting(key, value) {
		try {
			window.sessionStorage.setItem(key, value);
			return true;
		} catch (error) {
			return false;
		}
	}

	function removeSetting(key) {
		try {
			window.sessionStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		}
	}

	function applyTitle(title) {
		var titleElements = document.querySelectorAll('[data-brand-title]');
		for (var i = 0; i < titleElements.length; i++) {
			titleElements[i].textContent = title;
		}
	}

	function applyLogo(dataUrl) {
		var logoElements = document.querySelectorAll('[data-brand-logo]');
		for (var i = 0; i < logoElements.length; i++) {
			if (dataUrl) {
				logoElements[i].src = dataUrl;
				logoElements[i].hidden = false;
			} else {
				logoElements[i].removeAttribute('src');
				logoElements[i].hidden = true;
			}
		}
	}

	function showStorageError() {
		alert('Non è stato possibile salvare la personalizzazione nella sessione del browser. Prova con un logo più piccolo.');
	}

	document.addEventListener('DOMContentLoaded', function () {
		var titleInput = document.getElementById('brandTitleInput');
		var logoInput = document.getElementById('brandLogoInput');
		var removeLogoButton = document.getElementById('removeBrandLogo');
		var storedTitle = readSetting(titleKey);
		var initialTitle = storedTitle !== null ? storedTitle : defaultTitle;

		if (titleInput) {
			titleInput.value = initialTitle;
		}
		applyTitle(initialTitle);
		applyLogo(readSetting(logoKey));

		if (titleInput) {
			titleInput.addEventListener('input', function () {
				applyTitle(titleInput.value);
			});
			titleInput.addEventListener('change', function () {
				if (!writeSetting(titleKey, titleInput.value)) {
					showStorageError();
				}
			});
		}

		if (logoInput) {
			logoInput.addEventListener('change', function () {
				var file = logoInput.files && logoInput.files[0];
				if (!file) {
					return;
				}

				if (file.size > maxFileSize) {
					alert('Il logo deve avere dimensioni inferiori a 5 MB.');
					logoInput.value = '';
					return;
				}

				if (['image/png', 'image/jpeg', 'image/webp'].indexOf(file.type) === -1) {
					alert('Il file selezionato non è un’immagine supportata. Scegli PNG, JPEG o WebP; i file PDF e Word non sono accettati.');
					logoInput.value = '';
					return;
				}

				var reader = new FileReader();
				reader.onerror = function () {
					alert('Non è stato possibile leggere il file del logo.');
					logoInput.value = '';
				};
				reader.onload = function () {
					var image = new Image();
					image.onerror = function () {
						alert('Il file selezionato non contiene un’immagine valida. Scegli PNG, JPEG o WebP; i file PDF e Word non sono accettati.');
						logoInput.value = '';
					};
					image.onload = function () {
						var scale = Math.min(1, maxLogoWidth / image.naturalWidth, maxLogoHeight / image.naturalHeight);
						var canvas = document.createElement('canvas');
						canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
						canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

						var context = canvas.getContext('2d');
						if (!context) {
							alert('Non è stato possibile elaborare il logo.');
							return;
						}
						context.drawImage(image, 0, 0, canvas.width, canvas.height);

						var dataUrl = canvas.toDataURL('image/webp', 0.9);
						if (dataUrl.indexOf('data:image/webp') !== 0) {
							dataUrl = canvas.toDataURL('image/png');
						}
						if (dataUrl.length > 4 * 1024 * 1024 || !writeSetting(logoKey, dataUrl)) {
							showStorageError();
							return;
						}

						applyLogo(dataUrl);
					};
					image.src = reader.result;
				};
				reader.readAsDataURL(file);
			});
		}

		if (removeLogoButton) {
			removeLogoButton.addEventListener('click', function () {
				if (!removeSetting(logoKey)) {
					showStorageError();
					return;
				}
				if (logoInput) {
					logoInput.value = '';
				}
				applyLogo(null);
			});
		}
	});
})();
