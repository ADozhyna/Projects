import { flags, canvasSize, pencilSizes, defaultColor } from '../constants/constants'
import { getLineCoord } from './bresenham';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const currentColor = document.querySelector('#current');

let oldX;
let oldY;
let coords = [];

function drawPixel(x, y) {
    if (flags.pencil || flags.stroke) {
        flags.isDrawing = true;
        context.fillStyle = defaultColor.color;
        context.fillRect(x, y, pencilSizes.size, pencilSizes.size);
    }
}

function drawLine(event) {
    if (!flags.pencil && !flags.isDrawingy) {
        oldX = null;
        oldY = null;
    }
    if (flags.pencil) {

        const x = Math.floor(event.layerX / canvasSize.scale);
        const y = Math.floor(event.layerY / canvasSize.scale);

        if (oldX !== null) {
            /* eslint-disable */
            getLineCoord({ x, y }, { x: oldX, y: oldY }, flags.isDrawing).forEach(({ x, y }) => {
                drawPixel(x, y);
            });
            /* eslint-enable */
        }

        oldX = x;
        oldY = y;
    }

}

function finishDraw() {
    if (flags.pencil || flags.stroke) {
        if (flags.isDrawing) {
            flags.isDrawing = false;
        }
    }
}

function colorPicker(ev) {
    if (flags.colorPick) {
        const imgData = context.getImageData(Math.floor(ev.layerX / canvasSize.scale), Math.floor(ev.layerY / canvasSize.scale), 1, 1);
        const rgbColor = imgData.data;
        const colorHex = [];
        rgbColor.map((x) => {
            let hex = x.toString(16);
            if (hex.length === 1) hex = `0${hex}`;
            return colorHex.push(hex);
        });
        colorHex.pop();
        defaultColor.color = `#${colorHex.join('')}`;
        document.querySelector('.secondary').style.backgroundColor = currentColor.value;
        currentColor.value = defaultColor.color;
        document.querySelector('.primary').style.backgroundColor = currentColor.value;
    }
}

function paintBucket() {
    if (flags.paintb) {
        context.fillStyle = defaultColor.color;
        context.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }
}

function stroke(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.strokeStyle = defaultColor.color;
    context.lineWidth = pencilSizes.size;
    context.lineJoin = 'butt';
    context.lineTo(x2, y2);
    context.stroke();
}


function getCoords(e) {
    if (flags.stroke) {
        coords.push(Math.floor(e.layerX / canvasSize.scale), Math.floor(e.layerY / canvasSize.scale));
        if (coords.length === 4) {
            stroke(...coords);
            coords = [];
        }

    }
}

export { finishDraw, drawLine, drawPixel, paintBucket, canvasSize, colorPicker, getCoords, getLineCoord };