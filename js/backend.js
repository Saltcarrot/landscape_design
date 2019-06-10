'use strict';

/**
 * Немедленно выполняемая функция, предназначенная для отправки HTTP-запросов на сторону сервера
 * Ничего не принимает
 * Возвращает функции для отправки/получения данных со стороны сервера
 */
window.backend = (function () {
    let URL_FOR_GET_LIST = 'http://localhost/landscape-editor/search-data.php',
        URL_FOR_GET_OBJECT = 'http://localhost/landscape-editor/search-object.php',
        URL_FOR_GET_OPTIONS = 'http://localhost/landscape-editor/search-select-options.php';

    return {
        /**
         * Функция получения вариантов выбора условий
         * Ничего не принимает
         * Ничего не возвращает
         */
        loadSelectOptions: function () {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    window.util.addSelectOptions(xhr.response);
                } else {
                    window.util.isError('Ошибка запроса: ' + xhr.status + ' / ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                window.util.isError('Ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                window.util.isError('Превышено время ожидания');
            });
            xhr.timeout = 5000;
            xhr.open('GET', URL_FOR_GET_OPTIONS);
            xhr.send();
        },
        /**
         * Функция отправки выбранных условий на сторону сервера для получения объектов из базы данных
         * Принимает JSON-объект
         * Ничего не возвращает
         */
        saveSearchOptions: function (data) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    window.util.addObjects(xhr.response);
                } else {
                    window.util.isError('Ошибка запроса: ' + xhr.status + ' / ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                window.util.isError('Ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                window.util.isError('Превышено время ожидания');
            });
            xhr.timeout = 5000;
            xhr.open('POST', URL_FOR_GET_LIST);
            xhr.send(data);
        },
        /**
         * Функция получения полной информации об объекте
         * Принимает JSON-объект
         * Ничего не возвращает
         */
        searchObject: function (data) {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    window.util.showCard(xhr.response);
                } else {
                    window.util.isError('Ошибка запроса: ' + xhr.status + ' / ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                window.util.isError('Ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                window.util.isError('Превышено время ожидания');
            });
            xhr.timeout = 5000;
            xhr.open('POST', URL_FOR_GET_OBJECT);
            xhr.send(data);
        }
    };
})();