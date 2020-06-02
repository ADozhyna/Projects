import { highlight, saveData } from './frame-operation';
import { canvasSize } from '../constants/constants';
import { drawData } from './draw-frame';

let source;
let savedData;

function onDragStart(evt) {
    source = evt.target;
    savedData = saveData(source, canvasSize);
}

function onDragOver(evt) {
    evt.preventDefault();
}

function dropped(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const imageData = saveData(evt.target, canvasSize);
    drawData(source, imageData);
    drawData(evt.target, savedData)
    const canvas = document.querySelector('#canvas');
    drawData(canvas, savedData);
    highlight(evt.target.parentElement);
}

export { onDragStart, onDragOver, dropped }
