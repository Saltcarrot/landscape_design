'use strict';

/**
 * Немедленно выполняемая функция, предназначенная для работы с объектами редактора
 * Ничего не принимает
 * Возвращает функции управления состаяниями объектов редактора (изменить, добавить, удалить)
 */
window.tools = (function () {
    return {
        /**
         * Функция изменения свойства объекта
         * Принимает холст, свойство, значение
         * Ничего не возвращает
         */
        setObjectProperty: function (canvas, property, value) {
            let object = canvas.getActiveObject();
            if (!object) return;
            if (property === 'fill') {
                if ((object.get('type') === 'line') ||
                    (object.get('type') === 'rect') ||
                    (object.get('type') === 'circle') ||
                    (object.get('type') === 'text')) {
                    object.set(property, value);
                    canvas.renderAll();
                }
            } else if ((property === 'stroke') || (property === 'strokeWidth')) {
                if ((object.get('type') === 'line') ||
                    (object.get('type') === 'rect') ||
                    (object.get('type') === 'circle') ||
                    (object.get('type') === 'path')) {
                    object.set(property, value);
                    canvas.renderAll();
                }
            } else if (property === 'fontSize') {
                if (object.get('type') === 'text') {
                    object.set('fontSize', value);
                    canvas.renderAll();
                }
            }
        },
        /**
         * Функция конвертирования цвета из формата HEX в RGBA
         * Принимает цвет в формате HEX, прозрачность
         * Возвращает цвет в формате RGBA
         */
        setColor: function (color, opacity) {
            return "rgba(" +
                parseInt(color.slice(-6, -4), 16) + ", " +
                parseInt(color.slice(-4, -2), 16) + ", " +
                parseInt(color.slice(-2), 16) + ", " +
                opacity + ")";
        },
        /**
         * Функция добавления фигуры с заливкой-покрытием на холст
         * Принимает URL покрытия, холст
         * Ничего не возвращает
         */
        addPatternObject: function (url, canvas) {
            fabric.Image.fromURL(url, function(img) {
                img.scaleToWidth(100);
                img.scaleToHeight(100);
                let patternSourceCanvas = new fabric.StaticCanvas();
                patternSourceCanvas.add(img);
                patternSourceCanvas.setDimensions({
                    width: img.getScaledWidth(),
                    height: img.getScaledHeight()
                });
                patternSourceCanvas.renderAll();
                let pattern = new fabric.Pattern({
                    source: patternSourceCanvas.getElement(),
                    repeat: 'repeat'
                });
                let rect = new fabric.Rect({
                    width: 100,
                    height: 100,
                    fill: pattern,
                    objectCaching: false,
                    name: 'pattern',
                    borderColor: 'red',
                    cornerColor: 'rgba(255, 0, 0, .5)',
                    cornerStyle: 'circle',
                    transparentCorners: false,
                });
                canvas.add(rect);
                rect.center().setCoords();
            });
        },
        /**
         * Функция клонирования объекта
         * Принимает холст
         * Ничего не возвращает
         */
        cloneObject: function (canvas) {
            let activeObject = canvas.getActiveObject();
            if (activeObject) {
                activeObject.clone(function (cloned) {
                    canvas.discardActiveObject();
                    cloned.set({
                        top: cloned.top + 20,
                        evented: true,
                        borderColor: 'red',
                        cornerColor: 'rgba(255, 0, 0, .5)',
                        cornerStyle: 'circle',
                        transparentCorners: false,
                    });
                    if (cloned.type === 'activeSelection') {
                        cloned.canvas = canvas;
                        cloned.forEachObject(function (obj) {
                            canvas.add(obj);
                        });
                        cloned.setCoords();
                    } else {
                        canvas.add(cloned);
                    }
                    canvas.setActiveObject(cloned);
                    canvas.requestRenderAll();
                });
            }
        },
        /**
         * Функция удаления выбранных объектов с холста
         * Принимает холст
         * Ничего не возвращает
         */
        deleteSelectedObjects: function (canvas) {
            let selection = canvas.getActiveObject();
            if (!selection) {
                alert("Выберите объект!");
            } else {
                if (selection.type === 'activeSelection') {
                    selection.forEachObject(function (element) {
                        canvas.remove(element);
                    });
                } else {
                    canvas.remove(selection);
                }
                canvas.discardActiveObject();
                canvas.requestRenderAll();
            }
        },
        /**
         * Функция добавления текста на холст
         * Принимает холст, текст, размер текста, цвет текста
         * Ничего не возвращает
         */
        addText: function (canvas, text, size, color) {
            let text_object = new fabric.Text(text, {
                left: 10,
                top: 10,
                name: 'Text',
                fontSize: parseInt(size, 10) || 20,
                fontFamily: "Arial",
                fill: color,
                selectable: true,
                borderColor: 'red',
                cornerColor: 'rgba(255, 0, 0, .5)',
                cornerStyle: 'circle',
                transparentCorners: false,
            });
            canvas.add(text_object);
            canvas.renderAll();
        },
        /**
         * Функция добавления иконки объекта на холст
         * Принимает холст, URL иконки, тип объекта
         * Ничего не возвращает
         */
        addSVGIcon: function (canvas, url, type) {
            fabric.loadSVGFromURL(url, function(objects) {
                let image = fabric.util.groupSVGElements(objects, {
                    name: type,
                    left: 50,
                    top: 50,
                    originX: 'center',
                    originY: 'center',
                    lockRotating: true,
                    lockRotation: true,
                    borderColor: 'red',
                    cornerColor: 'rgba(255, 0, 0, .5)',
                    cornerStyle: 'circle',
                    transparentCorners: false,
                });
                if (type === 'tree') {
                    image.padding = 20;
                }
                canvas.add(image);
            });
        },
        /**
         * Функция скачивания изображения холста
         * Принимает холст
         * Ничего не возвращает
         */
        downloadImg: function (canvas) {
            let a = document.createElement('a');
            a.href = canvas.toDataURL();
            a.download = "Чертеж ландшафта участка.png";
            a.click();
        },
        /**
         * Функция задания холсту заднего плана
         * Принимает холст
         * Ничего не возвращает
         */
        addBackGroundImage: function (canvas) {
            fabric.Image.fromURL('img/grid.png', function(img) {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    width: img.width,
                    height: img.height
                });
            });
        },
        /**
         * Функция перемещения выбранного объекта на передний план
         * Принимает холст
         * Ничего не возвращает
         */
        toFront: function (canvas) {
            let obj = canvas.getActiveObject();
            if (!obj) return;
            if ((obj.get('type') === 'rect') || (obj.get('type') === 'circle')) {
                canvas.bringToFront(obj).discardActiveObject().renderAll();
            }
        },
        /**
         * Функция перемещения выбранного объекта на задний план
         * Принимает холст
         * Ничего не возвращает
         */
        toBack: function (canvas) {
            let obj = canvas.getActiveObject();
            if (!obj) return;
            if ((obj.get('type') === 'rect') || (obj.get('type') === 'circle')) {
                canvas.sendToBack(obj).discardActiveObject().renderAll();
            }
        },
        /**
         * Функция обновления отображения теней объектов на холсте
         * Принимает логическое значение тени, холст, смещение солнца по оси Y, смещение солнца по оси X
         * Ничего не возвращает
         */
        updateShadow: function (isShadow, canvas, sunY, sunX) {
            if (isShadow) {
                canvas.getObjects().filter(function (object) {
                    if (((object.get('type') === 'rect') && (object.get('name') !== 'pattern')) ||
                        (object.get('type') === 'circle') ||
                        ((object.get('type') === 'group') &&
                            (object.get('name') === 'tree') || (object.get('name') === 'bush'))) {

                        let shadowX, shadowY;

                        if (object.left > sunX) {
                            shadowX = object.left - sunX;
                            if (shadowX > (object.width / 2)) shadowX = object.width / 2;
                        } else {
                            shadowX = (sunX - object.left) * (-1);
                            if (shadowX < (object.width / 2 * (-1))) shadowX = (object.width / 2) * (-1);
                        }

                        if (object.top > sunY) {
                            shadowY = object.top - sunY;
                            if (shadowY > (object.height / 2)) shadowY = (object.height) / 2;
                        } else {
                            shadowY = (sunY - object.top) * (-1);
                            if (shadowY < (object.height / 2 * (-1))) shadowY = (object.height / 2) * (-1);
                        }

                        object.setShadow({
                            color: 'rgba(0, 0, 0, .4)',
                            blur: 0,
                            offsetX: shadowX,
                            offsetY: shadowY
                        });
                        canvas.renderAll();
                    }
                });
            } else {
                canvas.getObjects().filter(object => {
                    object.setShadow('none');
                });
                canvas.renderAll();
            }
        },
        /**
         * Функция отображения солнца на холсте
         * Принимает логическое значения солнца, холст, смещение солнца по оси X, смещение солнца по оси Y
         * Ничего не возвращает
         */
        updateSun: function (isSun, canvas, sunX, sunY) {
            if (isSun) {
                fabric.loadSVGFromURL('img/sunny.svg', function (objects) {
                    let image = fabric.util.groupSVGElements(objects, {
                        name: 'sun',
                        top: sunY,
                        left: sunX,
                        lockUniScaling: true,
                        lockRotation: true,
                        lockScalingX: true,
                        lockScalingY: true,
                        hasBorders: false,
                        transparentCorners: true,
                        originX: 'center',
                        originY: 'center',
                        cornerColor: 'transparent',
                    });
                    canvas.add(image);
                    canvas.bringToFront(image).discardActiveObject().renderAll();
                });
            } else {
                canvas.getObjects().filter(function (object) {
                    if (object.get('name') === 'sun') {
                        canvas.remove(object);
                    }
                });
            }
        },
        /**
         * Функция проверки пересечения объектов
         * Принимает холст, объект события
         * Ничего не возвращает
         */
        checkObjectIntersection: function(canvas, evt) {
            evt.target.setCoords();
            canvas.forEachObject(function(object) {
                if (object === evt.target) return;
                if ((object.get('name') === 'tree') || (object.get('name') === 'bush')) {
                    object.set('opacity', evt.target.intersectsWithObject(object) ? 0.3 : 1);
                }
            });
        }
    }
})();