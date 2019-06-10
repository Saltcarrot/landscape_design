'use strict';

/**
 * Немедленно выполняемая функция, предназначенная для обработки данных отправляемой формы начальных условий
 * Ничего не принимает
 * Ничего не возвращает
 */
(function () {
	let form = document.querySelector('form');

	let climateSelect = document.getElementById('climate'),
		lightSelect = document.getElementById('light'),
		wateringSelect = document.getElementById('watering'),
		enduranceSelect = document.getElementById('endurance'),
		temperatureMaxInput = document.getElementById('temperature-max'),
		airHumidityMaxInput = document.getElementById('air-humidity-max'),
		areaWidth = document.getElementById('area-width'),
		areaHeight = document.getElementById('area-height');

	let climate,
		light,
		watering,
		endurance,
		temperature_max,
		air_humidity_max,
		area_width,
		area_height;

	window.backend.loadSelectOptions();

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		climate = climateSelect.options[climateSelect.selectedIndex].value;
		light = lightSelect.options[lightSelect.selectedIndex].value;
		watering = wateringSelect.options[wateringSelect.selectedIndex].value;
		endurance = enduranceSelect.options[enduranceSelect.selectedIndex].value;
		temperature_max = temperatureMaxInput.value;
		air_humidity_max = airHumidityMaxInput.value;
		area_width = parseInt(areaWidth.value, 10) || 1000;
		area_height = parseInt(areaHeight.value, 10) || 500;

		if (temperature_max !== '') {
			temperature_max = parseInt(temperatureMaxInput.value, 10) || 0;
		} else temperature_max = 100;
		if (air_humidity_max !== '') {
			air_humidity_max = parseInt(airHumidityMaxInput.value, 10) || 0;
		} else air_humidity_max = 100;

		let json = {
			"climate": climate,
			"light": light,
			"watering": watering,
			"endurance": endurance,
			"temperature_max": temperature_max,
			"air_humidity_max": air_humidity_max
		};
		let data = JSON.stringify(json);

		window.backend.saveSearchOptions(data);

		let canvas = document.createElement('canvas');
		canvas.id = 'this-canvas';
		canvas.width = area_width;
		canvas.height = area_height;
		document.querySelector('.canvas-middle').appendChild(canvas);

		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'js/canvas.js';
		script.defer = 'defer';
		document.querySelector('head').appendChild(script);

		window.util.closeForm();
	});
})();
