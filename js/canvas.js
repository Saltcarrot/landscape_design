'use strict';

/**
 * Немедленно выполняемая функция, обрабатывающая события в редакторе
 * Ничего не принимает
 * Ничего не возвращает
 */
window.canvas = (function () {
    let Z_KEY = 90,
        Y_KEY = 89,
        C_KEY = 67,
        BACKSPACE_KEY = 8,
        ESC_KEY = 27;

    let TEXTURE_PATH = '/landscape-editor/texture/';

    let canvas = new fabric.Canvas('this-canvas'),
        actionBtn = document.querySelector(".action-btn"),
        listBtn = document.querySelector(".list"),
        handBtn = document.querySelector(".hand"),
        delBtn = document.querySelector(".delete"),
        brshBtn = document.querySelector(".brush"),
        lineBtn = document.querySelector(".line"),
        recBtn = document. querySelector(".rectangle"),
        crclBtn = document.querySelector(".circle"),
        txtBtn = document.querySelector(".text"),
        rectTexture = document.querySelector('.rectangle-pattern'),
        flower = document.querySelector('.flower'),
        waterFlower = document.querySelector('.water-flower'),
        bush = document.querySelector('.bush'),
        tree = document.querySelector('.tree'),
        pound = document.querySelector('.pound'),
        undoBtn = document.querySelector(".undo"),
        redoBtn = document.querySelector(".redo"),
        unselectBtn = document.querySelector('.unselect'),
        toBackBtn = document.querySelector('.to-backward'),
        toFrontBtn = document.querySelector('.to-forward'),
        addShadowBtn = document.querySelector('.add-shadow'),
        removeShadowBtn = document.querySelector('.remove-shadow'),
        addSunBtn = document.querySelector('.add-sun'),
        removeSunBtn = document.querySelector('.remove-sun'),
        clrBtn = document.querySelector(".clear"),
        dwnldImg = document.querySelector(".save"),
        txtSubmitBtn = document.querySelector(".add-text-area"),
        txtEraseBtn = document.querySelector(".erase-text-area"),
        closeCardBtn = document.querySelector('.close-card');

    let lineWidthRange = document.getElementById("line-width"),
        lineWidthOutput = document.getElementById('line-width-val'),
        lineColorInput = document.getElementById("line-color"),
        lineOpacityRange = document.getElementById("line-color-opacity"),
        lineOpacityValue = document.getElementById("line-color-opacity-val"),
        fillColorInput = document.getElementById("fill-color"),
        fillOpacityRange = document.getElementById("fill-color-opacity"),
        fillOpacityValue = document.getElementById("fill-color-opacity-val"),
        textInput = document.getElementById("text-area"),
        textSizeRange = document.getElementById("text-size"),
        textSizeOutput = document.getElementById('text-size-val'),
        textColorInput = document.getElementById("text-color"),
        textOpacityInput = document.getElementById("text-color-opacity"),
        textOpacityValue = document.getElementById("text-color-opacity-val");

    let itemList = document.querySelector('.list-items');

    let grassTexture = document.querySelector('.grass-texture'),
        groundTexture = document.querySelector('.ground-texture'),
        woodTexture = document.querySelector('.wood-texture'),
        tileTexture = document.querySelector('.tile-texture');

    let grassOne = document.querySelector('.grass.one'),
        grassTwo = document.querySelector('.grass.two'),
        grassThree = document.querySelector('.grass.three'),
        groundOne = document.querySelector('.ground.one'),
        groundTwo = document.querySelector('.ground.two'),
        groundThree = document.querySelector('.ground.three'),
        woodOne = document.querySelector('.wood.one'),
        woodTwo = document.querySelector('.wood.two'),
        woodThree = document.querySelector('.wood.three'),
        tileOne = document.querySelector('.tile.one'),
        tileTwo = document.querySelector('.tile.two'),
        tileThree = document.querySelector('.tile.three');

    let isSelect = false,
        isDraw = false,
        isLine = false,
        isRectangle = false,
        isCircle = false,
        isShadow = false,
        isSun = false;

    let pointer,
        points = [],
        mouse = {
            x: 0,
            y: 0
        },
        sun = {
            x: 50,
            y: 50
        };

    let line_width = 1,
        line_style = "butt",
        line_color = "rgba(0, 0, 0, 1)",
        line_opacity = 1,
        fill_color = "rgba(0, 0, 0, 0)",
        fill_opacity = 0,
        text_size = 20 + "px",
        text_color = "rgba(0, 0, 0, 1)",
        text_opacity = 1;

    let line_object,
        rectangle_object,
        circle_object;

    window.tools.addBackGroundImage(canvas);

    let history = new History(canvas);

    canvas.on('mouse:down', evt => {
        if (!canvas.isDrawingMode) {
            isDraw = true;
            if (isLine) {
                pointer = canvas.getPointer(evt.e);
                points = [pointer.x, pointer.y, pointer.x, pointer.y];
                line_object = new fabric.Line(points, {
                    strokeWidth: line_width,
                    stroke: line_color,
                    strokeLineCap: line_style,
                    originX: 'center', originY: 'center',
                    borderColor: 'red',
                    cornerColor: 'rgba(255, 0, 0, .5)',
                    cornerStyle: 'circle',
                    transparentCorners: false,
                    selectable: true
                });
                canvas.add(line_object);
            } else if (isRectangle) {
                pointer = canvas.getPointer(evt.e);
                mouse.x = pointer.x;
                mouse.y = pointer.y;
                rectangle_object = new fabric.Rect({
                    left: mouse.x,
                    top: mouse.y,
                    strokeWidth: line_width,
                    stroke: line_color,
                    width: pointer.x - mouse.x,
                    height: pointer.y - mouse.y,
                    fill: fill_color,
                    // originX: 'center', originY: 'center',
                    borderColor: 'red',
                    cornerColor: 'rgba(255, 0, 0, .5)',
                    cornerStyle: 'circle',
                    transparentCorners: false,
                    selectable: true
                });
                canvas.add(rectangle_object);
            } else if (isCircle) {
                pointer = canvas.getPointer(evt.e);
                mouse.x = pointer.x;
                mouse.y = pointer.y;
                circle_object = new fabric.Circle({
                    left: pointer.x,
                    top: pointer.y,
                    radius: 1,
                    strokeWidth: line_width,
                    stroke: line_color,
                    fill: fill_color,
                    originX: 'center', originY: 'center',
                    borderColor: 'red',
                    cornerColor: 'rgba(255, 0, 0, .5)',
                    cornerStyle: 'circle',
                    transparentCorners: false,
                    selectable: true
                });
                canvas.add(circle_object);
            }
        }
    });

    canvas.on('mouse:move', evt => {
        if (!isDraw) return;
        if (isLine) {
            pointer = canvas.getPointer(evt.e);
            line_object.set({
                x2: pointer.x,
                y2: pointer.y
            });
            canvas.renderAll();
        } else if (isRectangle) {
            pointer = canvas.getPointer(evt.e);
            rectangle_object.set('width', Math.abs(rectangle_object.left - pointer.x));
            rectangle_object.set('height', Math.abs(rectangle_object.top - pointer.y));
            canvas.renderAll();
        } else if (isCircle) {
            pointer = canvas.getPointer(evt.e);
            circle_object.set({ radius: Math.abs(mouse.x - pointer.x) });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', () => {
        if (isLine || isRectangle || isCircle) {
            history.save();
        }
        isDraw = false;
        canvas.renderAll();
    });

    canvas.on('object:modified', () => { history.save(); });

    canvas.on('object:scaling', evt => {
        if (evt.target.get('name') === 'pattern') {
            let obj = evt.target;
            let height = obj.height * obj.scaleY;
            let width = obj.width * obj.scaleX;
            obj.height = height;
            obj.width = width;
            obj.scaleX = 1;
            obj.scaleY = 1;
        } else if ((evt.target.get('name') === 'tree') || (evt.target.get('name') === 'bush')) {
            window.tools.checkObjectIntersection(canvas, evt);
        }
    });

    canvas.on('object:moving', evt => {
        if (evt.target.get('name') === 'sun') {
            sun.x = evt.target.left;
            sun.y = evt.target.top;
            canvas.bringToFront(evt.target).discardActiveObject().renderAll();
            window.tools.updateShadow(isShadow, canvas, sun.y, sun.x);
        } else if ((evt.target.get('name') === 'tree') || (evt.target.get('name') === 'bush')) {
            window.tools.checkObjectIntersection(canvas, evt);
        }
    });

    canvas.on('object:rotating', evt => {
        if ((evt.target.get('name') === 'tree') || (evt.target.get('name') === 'bush')) {
            window.tools.checkObjectIntersection(canvas, evt);
        }
    });

    canvas.on('object:moved', evt => {
        if (evt.target.get('name') === 'sun') {
            canvas.bringToFront(evt.target).discardActiveObject().renderAll();
        }
    });

    actionBtn.onclick = () => { window.util.showListElements(); };

    listBtn.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        window.util.showListElements();
    };

    handBtn.onclick = () => {
        isSelect = true;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = true;
        canvas.isDrawingMode = false;
        window.util.showAllProperties();
    };

    delBtn.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = true;
        canvas.isDrawingMode = false;
        window.tools.deleteSelectedObjects(canvas);
        history.save();
    };

    brshBtn.onclick = () => {
        isSelect = false;
        isLine = true;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = true;
        window.util.showLineProperties();
    };

    lineBtn.onclick = () => {
        isSelect = false;
        isLine = true;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showLineProperties();
    };

    recBtn.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = true;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showLineAndFillProperties();
    };

    crclBtn.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = true;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showLineAndFillProperties();
    };

    txtBtn.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showTextProperties();
    };

    rectTexture.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showPatterns();
    };

    flower.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showFlowers();
    };

    waterFlower.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showWaterPlants();
    };

    bush.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showBushes();
    };

    tree.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showTrees();
    };

    pound.onclick = () => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        window.util.showPounds();
    };

    addShadowBtn.onclick = () => {
        isShadow = true;
        window.tools.updateShadow(isShadow, canvas, sun.y, sun.x);
        history.save();
    };

    removeShadowBtn.onclick = () => {
        isShadow = false;
        window.tools.updateShadow(isShadow, canvas, sun.y, sun.x);
        history.save();
    };

    addSunBtn.onclick = () => {
        isSun = true;
        window.tools.updateSun(isSun, canvas, sun.x, sun.y);
        history.save();
    };

    removeSunBtn.onclick = () => {
        isSun = false;
        window.tools.updateSun(isSun, canvas, sun.x, sun.y);
        history.save();
    };

    lineWidthRange.oninput = () => {
        line_width = parseInt(lineWidthRange.value);
        lineWidthOutput.value = line_width + "px";
        canvas.freeDrawingBrush.color = line_color;

        if (isSelect) window.tools.setObjectProperty(canvas, 'strokeWidth', line_width);
    };

    lineWidthRange.onmouseup = () => { if (isSelect) history.save(); };

    lineColorInput.oninput = () => {
        let color = lineColorInput.value;
        line_opacity = lineOpacityRange.value;
        line_color = window.tools.setColor(color, line_opacity);
        canvas.freeDrawingBrush.color = line_color;

        if (isSelect) window.tools.setObjectProperty(canvas, 'stroke', line_color);
    };

    lineColorInput.onmouseup = () => { if (isSelect) history.save(); };

    lineOpacityRange.oninput = () => {
        let color = lineColorInput.value;
        line_opacity = lineOpacityRange.value;
        line_color = window.tools.setColor(color, line_opacity);
        lineOpacityValue.value = lineOpacityRange.value * 100 + "%";
        canvas.freeDrawingBrush.color = line_color;

        if (isSelect) window.tools.setObjectProperty(canvas, 'stroke', line_color);
    };

    lineOpacityRange.onmouseup = () => { if (isSelect) history.save(); };

    fillColorInput.oninput = () => {
        let color = fillColorInput.value;
        fill_opacity = fillOpacityRange.value;
        fill_color = window.tools.setColor(color, fill_opacity);

        if (isSelect) window.tools.setObjectProperty(canvas, 'fill', fill_color);
    };

    fillColorInput.onmouseup = () => { if (isSelect) history.save(); };

    fillOpacityRange.oninput = () => {
        let color = fillColorInput.value;
        fill_opacity = fillOpacityRange.value;
        fill_color = window.tools.setColor(color, fill_opacity);
        fillOpacityValue.value = fillOpacityRange.value * 100 + "%";

        if (isSelect) window.tools.setObjectProperty(canvas, 'fill', fill_color);
    };

    fillOpacityRange.onmouseup = () => { if (isSelect) history.save(); };

    textSizeRange.oninput = () => {
        text_size = parseInt(textSizeRange.value);
        textSizeOutput.value = text_size + "px";

        if (isSelect) window.tools.setObjectProperty(canvas, 'fontSize', text_size);
    };

    textSizeRange.onmouseup = () => { if (isSelect) history.save(); };

    textColorInput.oninput = () => {
        let color = textColorInput.value;
        text_opacity = parseInt(textOpacityInput.value, 10) || 1;
        text_color = window.tools.setColor(color, text_opacity);
        textOpacityValue.value = textOpacityInput.value * 100 + "%";
        textInput.setAttribute("style", "color: " + text_color);

        if (isSelect) window.tools.setObjectProperty(canvas, 'fill', text_color);
    };

    textColorInput.onmouseup = () => { if (isSelect) history.save(); };

    textOpacityInput.oninput = () => {
        let color = textColorInput.value;
        text_opacity = textOpacityInput.value;
        text_color = window.tools.setColor(color, text_opacity);
        textOpacityValue.value = textOpacityInput.value * 100 + "%";
        textInput.setAttribute("style", "color: " + text_color);

        if (isSelect) window.tools.setObjectProperty(canvas, 'fill', text_color);
    };

    textOpacityInput.onmouseup = () => { if (isSelect) history.save(); };

    txtSubmitBtn.onclick = () => {
        if (textInput.value === "") {
            alert("Поле пустое!");
            textInput.focus();
        } else {
            canvas.selection = false;
            canvas.isDrawingMode = false;
            window.tools.addText(canvas, textInput.value, text_size, text_color);
            textInput.value = "";
            history.save();
        }
    };
    txtEraseBtn.onclick = () => { textInput.value = ""; };

    grassTexture.onclick = () => { window.util.showGrassPatterns(); };
    groundTexture.onclick = () => { window.util.showGroundPatterns(); };
    woodTexture.onclick = () => { window.util.showWoodPatterns(); };
    tileTexture.onclick = () => { window.util.showTilePatterns(); };

    grassOne.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'grass-1.jpg', canvas);
        history.save();
    };
    grassTwo.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'grass-2.jpg', canvas);
        history.save();
    };
    grassThree.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'grass-3.jpg', canvas);
        history.save();
    };
    groundOne.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'ground-1.jpg', canvas);
        history.save();
    };
    groundTwo.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'ground-2.jpg', canvas);
        history.save();
    };
    groundThree.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'ground-3.jpg', canvas);
        history.save();
    };
    woodOne.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'wood-1.jpg', canvas);
        history.save();
    };
    woodTwo.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'wood-2.jpg', canvas);
        history.save();
    };
    woodThree.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'wood-3.jpg', canvas);
        history.save();
    };
    tileOne.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'tile-1.jpg', canvas);
        history.save();
    };
    tileTwo.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'tile-2.jpg', canvas);
        history.save();
    };
    tileThree.onclick = () => {
        window.tools.addPatternObject(TEXTURE_PATH + 'tile-3.jpg', canvas);
        history.save();
    };

    undoBtn.onclick = () => { history.undo(); };
    redoBtn.onclick = () => { history.redo(); };

    unselectBtn.onclick = () => { canvas.discardActiveObject().renderAll(); };

    toBackBtn.onclick = () => {
        window.tools.toBack(canvas);
        history.save();
    };
    toFrontBtn.onclick = () => {
        window.tools.toFront(canvas);
        history.save();
    };

    clrBtn.onclick = function () {
        canvas.clear();
        window.tools.addBackGroundImage(canvas);
        window.tools.updateSun(canvas);
        history.save();
    };

    dwnldImg.onclick = () => { window.tools.downloadImg(canvas); };

    itemList.onclick = evt => {
        isSelect = false;
        isLine = false;
        isRectangle = false;
        isCircle = false;
        canvas.selection = false;
        canvas.isDrawingMode = false;
        let target = evt.target || window.event.srcElement;
        let object_type;
        object_type = window.util.checkObjectGroup(target.parentElement.parentElement.parentElement.className);
        if (target.tagName === 'P') {
            let json = {
                "type": object_type,
                "name": target.innerHTML
            };
            let data = JSON.stringify(json);
            window.backend.searchObject(data, window.util.isError);
        } else if (target.tagName === 'IMG') {
            window.tools.addSVGIcon(
                canvas,
                target.getAttribute('src'),
                object_type
            );
        }
    };

    closeCardBtn.onclick = () => { window.util.closeCard(); };

    document.onkeydown = (evt) => {
        if (evt.which === Z_KEY && evt.ctrlKey) {
            history.undo();
        } else if (evt.which === Y_KEY && evt.ctrlKey) {
            history.redo();
        } else if (evt.which === C_KEY && evt.ctrlKey) {
            window.tools.cloneObject(canvas);
            history.save();
        } else if (evt.which === BACKSPACE_KEY) {
            window.tools.deleteSelectedObjects(canvas);
            history.save();
        } else if (evt.which === ESC_KEY) {
            canvas.discardActiveObject().renderAll();
        }
    };
})();