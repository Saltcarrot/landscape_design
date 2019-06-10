'use strict';

/**
 * Немедленно выполняемая функция, предназначенная для работы с элементами HTML-страницы
 * Ничего не принимает
 * Возвращает набор функций для работы с элементами HTML-страницы
 */
window.util = (function () {
	let ICON_FOLDER = 'http://localhost/landscape-editor/objects_icons/',
		IMG_FOLDER = 'http://localhost/landscape-editor/object_imgs/';

	let listItems = document.querySelector(".list-items"),
		properties = document.querySelector(".properties"),
		actionBtn = document.querySelector(".action-btn"),
		editTip = document.querySelector('.edit-tip'),
		addTip = document.querySelector('.add-tip'),
		listTip = document.querySelector(".no-one-selected"),
		lineProperties = document.querySelector(".line-properties"),
		fillProperties = document.querySelector(".fill-properties"),
		textAreaProperties = document.querySelector(".text-area-input"),
		textArea = document.getElementById("text-area"),
		textAreaLabel = document.querySelector(".text-area-label"),
		textSubmit = document.querySelector(".add-text-area"),
		textErase = document.querySelector(".erase-text-area"),
		form = document.querySelector('form'),
		canvasContainer = document.querySelector('.canvas-block'),
		listFlowers = document.querySelector('.list-flowers'),
		listBushes = document.querySelector('.list-bushes'),
		listTrees = document.querySelector('.list-trees'),
		listWaterPlants = document.querySelector('.list-water-plants'),
		listPounds = document.querySelector('.list-pounds'),
		patternTypes = document.querySelector('.pattern-types');

	let objectCard = document.querySelector('.object-card'),
		objectName = objectCard.querySelector('h3'),
		objectPicture = objectCard.querySelector('.object-picture'),
		objectClimate = objectCard.querySelector('.climate'),
		objectGround = objectCard.querySelector('.ground'),
		objectWaterDeep = objectCard.querySelector('.water-deep'),
		objectEndurance = objectCard.querySelector('.endurance'),
		objectLifeTime = objectCard.querySelector('.lifetime'),
		objectAirHumidity = objectCard.querySelector('.air_humidity'),
		objectLight = objectCard.querySelector('.light'),
		objectTemperature = objectCard.querySelector('.temperature'),
		objectWatering = objectCard.querySelector('.watering'),
		objectPlantTime = objectCard.querySelector('.plant-time'),
		objectPitDeep = objectCard.querySelector('.pit-deep'),
		objectPitRadius = objectCard.querySelector('.pit-radius'),
		objectDistance = objectCard.querySelector('.distance'),
		poundDeep = objectCard.querySelector('.pound-deep'),
		poundLength = objectCard.querySelector('.pound-length'),
		poundWidth = objectCard.querySelector('.pound-width'),
		poundWaterLevel = objectCard.querySelector('.pound-water-level'),
		objectDescription = objectCard.querySelector('.description'),
		objectRemark = objectCard.querySelector('.remark');

	let grassPatterns = document.querySelector('.grass-patterns'),
		groundPatterns = document.querySelector('.ground-patterns'),
		woodPatterns = document.querySelector('.wood-patterns'),
		tilePatterns = document.querySelector('.tile-patterns');

	return {
		/**
		 * Функция вывода сообщения об ошибке в случае неудачной отправки HTTP-запроса
		 * Принимает сообщение об ошибке
		 * Ничего не возвращает
		 */
		isError: function (errorMessage) {
			let elem = document.querySelector('.error-message');
			if (!elem) {
				let container = document.createElement('div');
				container.classList.add('error-message');
				container.textContent = errorMessage;
				document.body.insertBefore(container, document.body.children[0]);
			}
		},
		/**
		 * Функция добавления класса HTML-элементу
		 * Принимает HTML-элемент
		 * Ничего не возвращает
		 */
		hideElement: function (element) {
			if (!element.classList.contains("hidden")) {
				element.classList.add("hidden");
			}
		},
		/**
		 * Функция удаления класса у HTML-элемента
		 * Принимает HTML-элемент
		 * Ничего не возвращает
		 */
		showElement: function (element) {
			if (element.classList.contains("hidden")) {
				element.classList.remove("hidden");
			}
		},
		/**
		 * Функция добавления вариантов выбора <option> в <select> со стороны сервера
		 * Принимает JSON-объект
		 * Ничего не возвращает
		 */
		addSelectOptions: function (data) {
			for (let select in data) {
				if (select === 'climate') {
					for (let i = 0; i < data[select].length; i++) {
						let selectClimate = document.getElementById('climate'),
							option = document.createElement('option');
						option.text = data[select][i];
						option.value = data[select][i];
						selectClimate.appendChild(option);
					}
				} else if (select === 'light') {
					for (let i = 0; i < data[select].length; i++) {
						let selectLight = document.getElementById('light'),
							option = document.createElement('option');
						option.text = data[select][i];
						option.value = data[select][i];
						selectLight.appendChild(option);
					}
				} else if (select === 'watering') {
					for (let i = 0; i < data[select].length; i++) {
						let selectWatering = document.getElementById('watering'),
							option = document.createElement('option');
						option.text = data[select][i];
						option.value = data[select][i];
						selectWatering.appendChild(option);
					}
				} else if (select === 'endurance') {
					for (let i = 0; i < data[select].length; i++) {
						let selectEndurance = document.getElementById('endurance'),
							option = document.createElement('option');
						option.text = data[select][i];
						option.value = data[select][i];
						selectEndurance.appendChild(option);
					}
				}
			}
		},
		/**
		 * Функция скрытия экранной формы начальных условий
		 * Не принимает ничего
		 * Ничего не возвращает
		 */
		closeForm: function () {
			window.util.hideElement(form);
			window.util.showElement(canvasContainer);
		},
		/**
		 * Функция заполнения списка полученными со стороны сервера данными объектов (иконка, наименование)
		 * Принимает JSON-объект
		 * Ничего не возвращает
		 */
		addObjects: function (data) {
			for (let type in data) {
				if (type === 'flower') {
					if (data[type].length > 0) {
						let ul = document.createElement('ul');
						for (let i = 0; i < data[type].length; i++) {
							let li = document.createElement('li');
							let p = document.createElement("p");
							let img = document.createElement('img');
							img.setAttribute('src', ICON_FOLDER + data[type][i][3]);
							img.setAttribute('alt', data[type][i][1]);
							img.setAttribute('title', 'Нажмите, чтобы добавить объект на холст');
							p.innerHTML = data[type][i][1];
							li.appendChild(img);
							li.appendChild(p);
							ul.appendChild(li);
						}
						listFlowers.appendChild(ul);
					}
				} else if (type === 'bush') {
					if (data[type].length > 0) {
						let ul = document.createElement('ul');
						for (let i = 0; i < data[type].length; i++) {
							let li = document.createElement('li');
							let p = document.createElement("p");
							let img = document.createElement('img');
							img.setAttribute('src', ICON_FOLDER + data[type][i][3]);
							img.setAttribute('alt', data[type][i][1]);
							img.setAttribute('title', 'Нажмите, чтобы добавить объект на холст');
							p.innerHTML = data[type][i][1];
							li.appendChild(img);
							li.appendChild(p);
							ul.appendChild(li);
						}
						listBushes.appendChild(ul);
					}
				} else if (type === 'tree') {
					if (data[type].length > 0) {
						let ul = document.createElement('ul');
						for (let i = 0; i < data[type].length; i++) {
							let li = document.createElement('li');
							let p = document.createElement("p");
							let img = document.createElement('img');
							img.setAttribute('src', ICON_FOLDER + data[type][i][3]);
							img.setAttribute('alt', data[type][i][1]);
							img.setAttribute('title', 'Нажмите, чтобы добавить объект на холст');
							p.innerHTML = data[type][i][1];
							li.appendChild(img);
							li.appendChild(p);
							ul.appendChild(li);
						}
						listTrees.appendChild(ul);
					}
				} else if (type === 'water_plant') {
					if (data[type].length > 0) {
						let ul = document.createElement('ul');
						for (let i = 0; i < data[type].length; i++) {
							let li = document.createElement('li');
							let p = document.createElement("p");
							let img = document.createElement('img');
							img.setAttribute('src', ICON_FOLDER + data[type][i][3]);
							img.setAttribute('alt', data[type][i][1]);
							img.setAttribute('title', 'Нажмите, чтобы добавить объект на холст');
							p.innerHTML = data[type][i][1];
							li.appendChild(img);
							li.appendChild(p);
							ul.appendChild(li);
						}
						listWaterPlants.appendChild(ul);
					}
				} else if (type === 'pound') {
					if (data[type].length > 0) {
						let ul = document.createElement('ul');
						for (let i = 0; i < data[type].length; i++) {
							let li = document.createElement('li');
							let p = document.createElement("p");
							let img = document.createElement('img');
							img.setAttribute('src', ICON_FOLDER + data[type][i][3]);
							img.setAttribute('alt', data[type][i][1]);
							img.setAttribute('title', 'Нажмите, чтобы добавить объект на холст');
							p.innerHTML = data[type][i][1];
							li.appendChild(img);
							li.appendChild(p);
							ul.appendChild(li);
						}
						listPounds.appendChild(ul);
					}
				}
			}
		},
		/**
		 * Функция отображения карточки объекта путем заполнения HTML-элементов данными со стороны сервера
		 * Принимает JSON-объект
		 * Ничего не возвращает
		 */
		showCard: function(data) {
			if (data[0] === 'flower') {
				objectName.innerHTML = data[1][1];
				objectPicture.setAttribute('src', IMG_FOLDER + data[1][2]);
				objectPicture.setAttribute('alt', data[1][1]);
				objectClimate.querySelector('p').innerHTML = data[1][4];
				objectGround.querySelector('p').innerHTML = data[1][5];
				objectEndurance.querySelector('p').innerHTML = data[1][6];
				objectLifeTime.querySelector('p').innerHTML = data[1][7] + ' лет';
				objectAirHumidity.querySelector('p').innerHTML = data[1][8] + '% - ' + data[1][9] + '%';
				objectLight.querySelector('p').innerHTML = data[1][10];
				objectTemperature.querySelector('p').innerHTML = data[1][11] + '&deg;C - ' + data[1][12] + '&deg;C';
				objectWatering.querySelector('p').innerHTML = data[1][13];
				objectPlantTime.querySelector('p').innerHTML = data[1][14];
				objectPitDeep.querySelector('p').innerHTML = data[1][15] / 100 + ' м';
				objectDescription.querySelector('p').innerHTML = data[1][16];
				if ((data[1][17] != null) || (data[1][17] !== '')) objectRemark.querySelector('p').innerHTML = data[1][17];

				this.showElement(objectClimate);
				this.showElement(objectGround);
				this.hideElement(objectWaterDeep);
				this.showElement(objectEndurance);
				this.showElement(objectLifeTime);
				this.showElement(objectAirHumidity);
				this.showElement(objectLight);
				this.showElement(objectTemperature);
				this.showElement(objectWatering);
				this.showElement(objectPlantTime);
				this.showElement(objectPitDeep);
				this.hideElement(objectPitRadius);
				this.hideElement(objectDistance);
				this.hideElement(poundDeep);
				this.hideElement(poundLength);
				this.hideElement(poundWidth);
				this.hideElement(poundWaterLevel);
				if ((data[1][17] == null) || (data[1][17] === '')) {
					this.hideElement(objectRemark);
				}
				this.hideElement(listTip);
				this.showElement(objectCard);
			} else if (data[0] === 'water_plant') {
				objectName.innerHTML = data[1][1];
				objectPicture.setAttribute('src', IMG_FOLDER + data[1][2]);
				objectPicture.setAttribute('alt', data[1][1]);
				objectClimate.querySelector('p').innerHTML = data[1][4];
				objectWaterDeep.querySelector('p').innerHTML = data[1][5] / 100 + ' м';
				objectEndurance.querySelector('p').innerHTML = data[1][6];
				objectLifeTime.querySelector('p').innerHTML = data[1][7] + ' лет';
				objectAirHumidity.querySelector('p').innerHTML = data[1][8] + '% - ' + data[1][9] + '%';
				objectLight.querySelector('p').innerHTML = data[1][10];
				objectTemperature.querySelector('p').innerHTML = data[1][11] + '&deg;C - ' + data[1][12] + '&deg;C';
				objectPlantTime.querySelector('p').innerHTML = data[1][13];
				objectDescription.querySelector('p').innerHTML = data[1][14];
				if ((data[1][15] != null) || (data[1][15] !== '')) objectRemark.querySelector('p').innerHTML = data[1][15];

				this.showElement(objectClimate);
				this.hideElement(objectGround);
				this.showElement(objectWaterDeep);
				this.showElement(objectEndurance);
				this.showElement(objectLifeTime);
				this.showElement(objectAirHumidity);
				this.showElement(objectLight);
				this.showElement(objectTemperature);
				this.hideElement(objectWatering);
				this.showElement(objectPlantTime);
				this.hideElement(objectPitDeep);
				this.hideElement(objectPitRadius);
				this.hideElement(objectDistance);
				this.hideElement(poundDeep);
				this.hideElement(poundLength);
				this.hideElement(poundWidth);
				this.hideElement(poundWaterLevel);
				if ((data[1][15] == null) || (data[1][15] === '')) {
					this.hideElement(objectRemark);
				}
				this.hideElement(listTip);
				this.showElement(objectCard);
			} else if (data[0] === 'bush') {
				objectName.innerHTML = data[1][1];
				objectPicture.setAttribute('src', IMG_FOLDER + data[1][2]);
				objectPicture.setAttribute('alt', data[1][1]);
				objectClimate.querySelector('p').innerHTML = data[1][4];
				objectGround.querySelector('p').innerHTML = data[1][5];
				objectEndurance.querySelector('p').innerHTML = data[1][6];
				objectLifeTime.querySelector('p').innerHTML = data[1][7] + ' лет';
				objectAirHumidity.querySelector('p').innerHTML = data[1][8] + '% - ' + data[1][9] + '%';
				objectLight.querySelector('p').innerHTML = data[1][10];
				objectTemperature.querySelector('p').innerHTML = data[1][11] + '&deg;C - ' + data[1][12] + '&deg;C';
				objectWatering.querySelector('p').innerHTML = data[1][13];
				objectPlantTime.querySelector('p').innerHTML = data[1][14];
				objectPitDeep.querySelector('p').innerHTML = data[1][15] / 100 + ' м';
				objectPitRadius.querySelector('p').innerHTML = data[1][16] / 100 + ' м';
				objectDescription.querySelector('p').innerHTML = data[1][17];
				if ((data[1][18] != null) || (data[1][18] !== '')) objectRemark.querySelector('p').innerHTML = data[1][18];

				this.showElement(objectClimate);
				this.showElement(objectGround);
				this.hideElement(objectWaterDeep);
				this.showElement(objectEndurance);
				this.showElement(objectLifeTime);
				this.showElement(objectAirHumidity);
				this.showElement(objectLight);
				this.showElement(objectTemperature);
				this.showElement(objectWatering);
				this.showElement(objectPlantTime);
				this.showElement(objectPitDeep);
				this.showElement(objectPitRadius);
				this.hideElement(objectDistance);
				this.hideElement(poundDeep);
				this.hideElement(poundLength);
				this.hideElement(poundWidth);
				this.hideElement(poundWaterLevel);
				if ((data[1][18] == null) || (data[1][18] === '')) {
					this.hideElement(objectRemark);
				}
				this.hideElement(listTip);
				this.showElement(objectCard);
			} else if (data[0] === 'tree') {
				objectName.innerHTML = data[1][1];
				objectPicture.setAttribute('src', IMG_FOLDER + data[1][2]);
				objectPicture.setAttribute('alt', data[1][1]);
				objectClimate.querySelector('p').innerHTML = data[1][4];
				objectGround.querySelector('p').innerHTML = data[1][5];
				objectEndurance.querySelector('p').innerHTML = data[1][6];
				objectLifeTime.querySelector('p').innerHTML = data[1][7] + ' лет';
				objectAirHumidity.querySelector('p').innerHTML = data[1][8] + '% - ' + data[1][9] + '%';
				objectLight.querySelector('p').innerHTML = data[1][10];
				objectTemperature.querySelector('p').innerHTML = data[1][11] + '&deg;C - ' + data[1][12] + '&deg;C';
				objectWatering.querySelector('p').innerHTML = data[1][13];
				objectPlantTime.querySelector('p').innerHTML = data[1][14];
				objectPitDeep.querySelector('p').innerHTML = data[1][15] / 100 + ' м';
				objectPitRadius.querySelector('p').innerHTML = data[1][16] / 100 + ' м';
				objectDistance.querySelector('p').innerHTML = data[1][17] / 100 + ' м';
				objectDescription.querySelector('p').innerHTML = data[1][18];
				if ((data[1][19] != null) || (data[1][19] !== '')) objectRemark.querySelector('p').innerHTML = data[1][19];

				this.showElement(objectClimate);
				this.showElement(objectGround);
				this.hideElement(objectWaterDeep);
				this.showElement(objectEndurance);
				this.showElement(objectLifeTime);
				this.showElement(objectAirHumidity);
				this.showElement(objectLight);
				this.showElement(objectTemperature);
				this.showElement(objectWatering);
				this.showElement(objectPlantTime);
				this.showElement(objectPitDeep);
				this.showElement(objectPitRadius);
				this.showElement(objectDistance);
				this.hideElement(poundDeep);
				this.hideElement(poundLength);
				this.hideElement(poundWidth);
				this.hideElement(poundWaterLevel);
				if ((data[1][19] == null) || (data[1][19] === '')) {
					this.hideElement(objectRemark);
				}
				this.hideElement(listTip);
				this.showElement(objectCard);
			} else if (data[0] === 'pound') {
				objectName.innerHTML = data[1][1];
				objectPicture.setAttribute('src', IMG_FOLDER + data[1][2]);
				objectPicture.setAttribute('alt', data[1][1]);
				poundDeep.querySelector('p').innerHTML = data[1][4] / 100 + ' м';
				poundLength.querySelector('p').innerHTML = data[1][5] / 100 + ' м';
				poundWidth.querySelector('p').innerHTML = data[1][6] / 100 + ' м';
				poundWaterLevel.querySelector('p').innerHTML = data[1][7] / 100 + ' м';
				objectDescription.querySelector('p').innerHTML = data[1][8];
				if ((data[1][9] != null) || (data[1][9] !== '')) objectRemark.querySelector('p').innerHTML = data[1][9];

				this.hideElement(objectClimate);
				this.hideElement(objectGround);
				this.hideElement(objectWaterDeep);
				this.hideElement(objectEndurance);
				this.hideElement(objectLifeTime);
				this.hideElement(objectAirHumidity);
				this.hideElement(objectLight);
				this.hideElement(objectTemperature);
				this.hideElement(objectWatering);
				this.hideElement(objectPlantTime);
				this.hideElement(objectPitDeep);
				this.hideElement(objectPitRadius);
				this.hideElement(objectDistance);
				this.showElement(poundDeep);
				this.showElement(poundLength);
				this.showElement(poundWidth);
				this.showElement(poundWaterLevel);
				if ((data[1][9] == null) || (data[1][9] === '')) {
					this.hideElement(objectRemark);
				}
				this.hideElement(listTip);
				this.showElement(objectCard);
			}
		},
		/**
		 * Функция отображения списка цветов
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showFlowers: function () {
			this.showListElements();
			this.hideElement(objectCard);
			this.showElement(listFlowers);
			this.hideElement(listBushes);
			this.hideElement(listTrees);
			this.hideElement(listWaterPlants);
			this.hideElement(listPounds);
		},
		/**
		 * Функция отображения списка кустарников
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showBushes: function () {
			this.showListElements();
			this.hideElement(listFlowers);
			this.showElement(listBushes);
			this.hideElement(listTrees);
			this.hideElement(listWaterPlants);
			this.hideElement(listPounds);
		},
		/**
		 * Функция отображения списка деревьев
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showTrees: function () {
			this.showListElements();
			this.hideElement(listFlowers);
			this.hideElement(listBushes);
			this.showElement(listTrees);
			this.hideElement(listWaterPlants);
			this.hideElement(listPounds);
		},
		/**
		 * Функция отображения списка водных растений
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showWaterPlants: function () {
			this.showListElements();
			this.hideElement(listFlowers);
			this.hideElement(listBushes);
			this.hideElement(listTrees);
			this.showElement(listWaterPlants);
			this.hideElement(listPounds);
		},
		/**
		 * Функция отображения списка водоемов
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showPounds: function () {
			this.showListElements();
			this.hideElement(listFlowers);
			this.hideElement(listBushes);
			this.hideElement(listTrees);
			this.hideElement(listWaterPlants);
			this.showElement(listPounds);
		},
		/**
		 * Функция отображения управляющих элементов для изменения свойств контура добавляемых фигур "Линия", "Кисть" (Толщина, цвет, прозрачность)
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showLineProperties: function () {
			this.hideElement(actionBtn);
			this.hideElement(listItems);
			this.hideElement(editTip);
			this.hideElement(listTip);
			this.showElement(addTip);
			this.showElement(properties);
			this.hideElement(patternTypes);
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.showElement(lineProperties);
			this.hideElement(fillProperties);
			this.hideElement(textAreaProperties);
		},
		/**
		 * Функция отображения управляющих элементов для изменения свойств контура и заливки добавляемых фигур "Окружность", "Прямоугольник" (Толщина контура, цвет контура, прозрачность контура, цвет заливки, прозрачность заливки)
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showLineAndFillProperties: function () {
			this.hideElement(actionBtn);
			this.hideElement(listItems);
			this.hideElement(listTip);
			this.showElement(addTip);
			this.hideElement(editTip);
			this.showElement(properties);
			this.hideElement(patternTypes);
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.showElement(lineProperties);
			this.showElement(fillProperties);
			this.hideElement(textAreaProperties);
			this.showElement(textArea);
			this.showElement(textAreaLabel);
			this.showElement(textSubmit);
			this.showElement(textErase);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения управляющих элементов для изменения свойств текста добавляемого объекта "Текст" (Поле ввода текста, размер текста, цвет текста, прозрачность текста)
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showTextProperties: function () {
			this.hideElement(actionBtn);
			this.hideElement(listItems);
			this.hideElement(objectCard);
			this.hideElement(editTip);
			this.hideElement(listTip);
			this.showElement(addTip);
			this.showElement(properties);
			this.hideElement(patternTypes);
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.hideElement(lineProperties);
			this.hideElement(fillProperties);
			this.showElement(textAreaLabel);
			this.showElement(textArea);
			this.showElement(textAreaProperties);
			this.showElement(textSubmit);
			this.showElement(textErase);
		},
		/**
		 * Функция отображения списка всех объектов
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showListElements: function () {
			this.hideElement(actionBtn);
			this.hideElement(properties);
			this.hideElement(patternTypes);
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.showElement(listItems);
			this.showElement(listFlowers);
			this.showElement(listBushes);
			this.showElement(listTrees);
			this.showElement(listWaterPlants);
			this.showElement(listPounds);
			this.hideElement(editTip);
			this.showElement(listTip);
			this.hideElement(addTip);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения управляющих элементов для изменения свойств уже существующих фигур "Кисть", "Линия", "Прямоугольник", "Окружность", "Текст"
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showAllProperties: function () {
			this.hideElement(actionBtn);
			this.hideElement(listItems);
			this.showElement(editTip);
			this.hideElement(listTip);
			this.hideElement(addTip);
			this.hideElement(patternTypes);
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.showElement(properties);
			this.showElement(lineProperties);
			this.showElement(fillProperties);
			this.showElement(textAreaProperties);
			this.hideElement(textArea);
			this.hideElement(textAreaLabel);
			this.hideElement(textSubmit);
			this.hideElement(textErase);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения всех типов покрытий
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showPatterns: function () {
			this.hideElement(actionBtn);
			this.hideElement(listItems);
			this.hideElement(properties);
			this.showElement(patternTypes);
		},
		/**
		 * Функция отображения всех вариантов покрытий типа "Газон"
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showGrassPatterns: function () {
			this.showElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.hideElement(listTip);
			this.hideElement(editTip);
			this.hideElement(addTip);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения всех вариантов покрытий типа "Грунт"
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showGroundPatterns: function () {
			this.hideElement(grassPatterns);
			this.showElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.hideElement(listTip);
			this.hideElement(editTip);
			this.hideElement(addTip);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения всех вариантов покрытий типа "Деревянное покрытие"
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showWoodPatterns: function () {
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.showElement(woodPatterns);
			this.hideElement(tilePatterns);
			this.hideElement(listTip);
			this.hideElement(editTip);
			this.hideElement(addTip);
			this.hideElement(objectCard);
		},
		/**
		 * Функция отображения всех вариантов покрытий типа "Камень и плитка"
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		showTilePatterns: function () {
			this.hideElement(grassPatterns);
			this.hideElement(groundPatterns);
			this.hideElement(woodPatterns);
			this.showElement(tilePatterns);
			this.hideElement(listTip);
			this.hideElement(editTip);
			this.hideElement(addTip);
			this.hideElement(objectCard);
		},
		/**
		 * Функция закрытия карточки объекта
		 * Ничего не принимает
		 * Ничего не возвращает
		 */
		closeCard: function () {
			this.hideElement(objectCard);
			this.showElement(listTip);
		},
		/**
		 * Функция перевода типа объекта с английского на русский
		 * Принимает тип объекта на английском языке
		 * Возвращает тип объекта на русском языке
		 */
		checkObjectGroup: function (group) {
			switch (group) {
				case 'list-flowers':
					return 'flower';
				case 'list-bushes':
					return 'bush';
				case 'list-trees':
					return 'tree';
				case 'list-water-plants':
					return 'water_plant';
				case 'list-pounds':
					return 'pound';
			}
		}
	}
})();
