'use strict';

/**
 * Функция, необходимая для управления состоянием холста
 * Принимает холст
 * Возвращает функции для управления состоянием холста
 */
let History = function (_canvas) {
    let canvas = _canvas;
    let config = {
        canvasState             : [],
        currentStateIndex       : -1,
        undoStatus              : false,
        redoStatus              : false,
        undoFinishedStatus      : 1,
        redoFinishedStatus      : 1,
        undoButton              : document.querySelector('.undo'),
        redoButton              : document.querySelector('.redo'),
    };

    return {
        /**
         * Функция сохранения состояния холста в стек состояний
         * Ничего не принимает
         * Ничего не возвращает
         */
        save: function () {
            if ((config.undoStatus === false && config.redoStatus === false)) {
                let jsonData = canvas.toJSON(['name',
                        'padding',
                        'cornerColor',
                        'borderColor',
                        'cornerStyle',
                        'transparentCorners',
                        'hasBorders']
                );
                let canvasAsJson = JSON.stringify(jsonData);
                if (config.currentStateIndex < config.canvasState.length - 1) {
                    let indexToBeInserted = config.currentStateIndex + 1;
                    config.canvasState[indexToBeInserted] = canvasAsJson;
                    let numberOfElementsToRetain = indexToBeInserted + 1;
                    config.canvasState = config.canvasState.splice(0, numberOfElementsToRetain);
                } else {
                    config.canvasState.push(canvasAsJson);
                }
                config.currentStateIndex = config.canvasState.length - 1;
                if ((config.currentStateIndex === config.canvasState.length - 1) && config.currentStateIndex !== -1) {
                    config.redoButton.disabled = "disabled";
                }
            }
        },
        /**
         * Функция получения предыдущего состояния холста из стека состояний
         * Ничего не принимает
         * Ничего не возвращает
         */
        undo: function () {
            if (config.undoFinishedStatus) {
                if (config.currentStateIndex === -1) {
                    config.undoStatus = false;
                } else {
                    if (config.canvasState.length >= 1) {
                        config.undoFinishedStatus = 0;
                        if (config.currentStateIndex !== 0) {
                            config.undoStatus = true;
                            canvas.loadFromJSON(config.canvasState[config.currentStateIndex - 1], () => {
                                canvas.renderAll();
                                config.undoStatus = false;
                                config.currentStateIndex -= 1;
                                config.undoButton.removeAttribute("disabled");
                                if (config.currentStateIndex !== config.canvasState.length - 1) {
                                    config.redoButton.removeAttribute('disabled');
                                }
                                config.undoFinishedStatus = 1;
                            });
                        } else if (config.currentStateIndex === 0) {
                            canvas.clear();
                            config.undoFinishedStatus = 1;
                            config.undoButton.disabled= "disabled";
                            config.redoButton.removeAttribute('disabled');
                            config.currentStateIndex -= 1;
                        }
                    }
                }
            }
        },
        /**
         * Функция получения следующего состояния холста из стека состояний
         * Ничего не принимает
         * Ничего не возвращает
         */
        redo: function () {
            if (config.redoFinishedStatus) {
                if ((config.currentStateIndex === config.canvasState.length -1) &&
                    config.currentStateIndex !== -1) {

                    config.redoButton.disabled= "disabled";
                } else {
                    if (config.canvasState.length > config.currentStateIndex &&
                        config.canvasState.length !== 0) {

                        config.redoFinishedStatus = 0;
                        config.redoStatus = true;
                        canvas.loadFromJSON(config.canvasState[config.currentStateIndex + 1], () => {
                            canvas.renderAll();
                            config.redoStatus = false;
                            config.currentStateIndex += 1;
                            if (config.currentStateIndex !== -1) {
                                config.undoButton.removeAttribute('disabled');
                            }
                            config.redoFinishedStatus = 1;
                            if ((config.currentStateIndex === config.canvasState.length - 1) &&
                                config.currentStateIndex !== -1) {

                                config.redoButton.disabled= "disabled";
                            }
                        });
                    }
                }
            }
        }
    }
};