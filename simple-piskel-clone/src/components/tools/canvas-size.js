import { canvasSize, bigSize, smallSize, mediumSize } from '../constants/constants';
import { drawResize } from '../frames/draw-frame';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let selected;

if (localStorage.getItem('selectedSize') !== null) {
    const id = localStorage.getItem('selectedSize')
    selected = document.querySelector(`#${id}`);
} else {
    selected = document.querySelector('#size-big');
}

selected.classList.add('active-button');

canvas.size = function change(x, y) {
    canvas.width = x;
    canvas.height = y;
}

function changeCanvasSize(element) {
    const id = element.getAttribute('id');
    const canvasFrames = document.querySelectorAll('.frame-canvas');
    const preview = document.querySelector('#preview');
    const framesData = JSON.parse(localStorage.getItem('frameCanvas'));
    if (selected) {
        selected.classList.remove('active-button');
    }
    selected = element;
    switch (id) {
        case 'size-big':
            canvasSize.width = bigSize.width;
            canvasSize.height = bigSize.height;
            canvasSize.scale = bigSize.scale;
            canvas.size(canvasSize.width, canvasSize.height);
            canvasFrames.forEach((elem) => {
                const canvasFrame = elem;
                canvasFrame.width = canvasSize.width;
                canvasFrame.height = canvasSize.height;
            });
            preview.width = canvasSize.width;
            preview.height = canvasSize.height;
            element.classList.add('active-button');
            for (let i = 0; i < canvasFrames.length; i += 1) {
                const ctx = canvasFrames[i].getContext('2d');
                drawResize(framesData[i], ctx, canvasFrames[i])
            };
            drawResize(localStorage.getItem('canvas'), context, canvas);
            localStorage.setItem('size', JSON.stringify(canvasSize));
            localStorage.setItem('selectedSize', 'size-big');
            break;
        case 'size-medium':
            canvasSize.width = mediumSize.width;
            canvasSize.height = mediumSize.height;
            canvasSize.scale = mediumSize.scale;
            canvas.size(canvasSize.width, canvasSize.height);
            canvasFrames.forEach((elem) => {
                const canvasFrame = elem;
                canvasFrame.width = canvasSize.width;
                canvasFrame.height = canvasSize.height;
            });
            preview.width = canvasSize.width;
            preview.height = canvasSize.height;
            element.classList.add('active-button');
            for (let i = 0; i < canvasFrames.length; i += 1) {
                const ctx = canvasFrames[i].getContext('2d');
                drawResize(framesData[i], ctx, canvasFrames[i])
            };
            drawResize(localStorage.getItem('canvas'), context, canvas);
            localStorage.setItem('size', JSON.stringify(canvasSize));
            localStorage.setItem('selectedSize', 'size-medium');
            break;
        case 'size-small':
            canvasSize.width = smallSize.width;
            canvasSize.height = smallSize.height;
            canvasSize.scale = smallSize.scale;
            canvas.size(canvasSize.width, canvasSize.height);
            canvasFrames.forEach((elem) => {
                const canvasFrame = elem;
                canvasFrame.width = canvasSize.width;
                canvasFrame.height = canvasSize.height;
            });
            preview.width = canvasSize.width;
            preview.height = canvasSize.height;
            element.classList.add('active-button');
            for (let i = 0; i < canvasFrames.length; i += 1) {
                const ctx = canvasFrames[i].getContext('2d');
                drawResize(framesData[i], ctx, canvasFrames[i])
            };
            drawResize(localStorage.getItem('canvas'), context, canvas);
            localStorage.setItem('size', JSON.stringify(canvasSize));
            localStorage.setItem('selectedSize', 'size-small');
            break;
        default:
            break;
    }
};

function chooseSize(event) {
    const sizeContain = event.target.closest('button');

    if (!sizeContain) return;

    changeCanvasSize(sizeContain);
}

export { chooseSize };