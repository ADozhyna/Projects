import './reset.css';
import './style.scss';
import { changeTool } from '../../components/tools/tool-select';
import '../../components/tools/color-select';
import { chooseSize } from '../../components/tools/canvas-size';
import { changePencilSizes } from '../../components/tools/pencil-size';
import { addFrame, highlight, addFrameNumber, clearCanvas, operationFrame, searchSelectedFrame } from '../../components/frames/frame-operation';
import { canvasSize, listFrames, keys } from '../../components/constants/constants'
import { finishDraw, drawPixel, drawLine, paintBucket, colorPicker, getCoords } from '../../components/tools/tools';
import { duplicateImage } from '../../components/frames/draw-frame';
import { onDragStart, onDragOver, dropped } from '../../components/frames/drag-frames';
import '../../components/preview-animation/animation-frames';
import '../../components/download-animation/download-animation';
import { keyControl } from '../../components/tools/key-control';
import { imgUpdate } from '../../components/tools/save-session';
import '../../components/tools/session-recovery';
import '../../components/tools/modal';

function init() {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const frameCanvas = document.querySelector('.frame-canvas');
    const framesList = document.querySelector('.frames');
    const buttonAdd = document.querySelector('.add-frame');
    const sizeButtons = document.querySelector('.change-size-button');
    const currentColor = document.querySelector('#current');
    const tools = document.querySelector('.tools');
    const penSizesList = document.querySelector('.pencil-sizes');
    const fullscreenButton = document.querySelector('.animate-fullscreen');
    const preview = document.querySelector('#preview');
    const fps = document.querySelector('.fps-input');

    if (localStorage.getItem('fps') !== null) fps.value = localStorage.getItem('fps');

    if (localStorage.getItem('size') !== null) {
        const size = JSON.parse(localStorage.getItem('size'));
        canvasSize.width = size.width;
        canvasSize.height = size.height;
        canvasSize.scale = size.scale;
    }

    if (localStorage.getItem('frameCanvas') === null) {
        listFrames.push(document.querySelector('.frame-canvas'));
    }

    frameCanvas.width = canvasSize.width;
    frameCanvas.height = canvasSize.height;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    preview.width = canvasSize.width;
    preview.height = canvasSize.height;

    canvas.addEventListener('mousedown', (event) => {
        const x = Math.floor(event.layerX / canvasSize.scale);
        const y = Math.floor(event.layerY / canvasSize.scale);
        drawPixel(x, y);
    });
    canvas.addEventListener('mousedown', paintBucket);
    canvas.addEventListener('mousedown', getCoords);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseup', () => {
        const frame = searchSelectedFrame();
        const frames = document.querySelectorAll('.frame-canvas');
        duplicateImage(frame, context, canvasSize);
        imgUpdate(canvas, frames, canvasSize);
    });
    canvas.addEventListener('mousedown', colorPicker);

    framesList.addEventListener('click', (event) => {
        const buttonContain = event.target.closest('button');
        const canvasContain = event.target.closest('canvas');
        const liContain = event.target.closest('li');
        if (!buttonContain && !canvasContain && !liContain) return;
        if (!framesList.contains(canvasContain || buttonContain || liContain)) return;
        if (!buttonContain) highlight(liContain);
        if (buttonContain) {
            operationFrame(buttonContain);
            imgUpdate(canvas, listFrames, canvasSize);
        }
        if (canvasContain) {
            const ctx = canvasContain.getContext('2d');
            duplicateImage(canvas, ctx, canvasSize);
        }
    });
    framesList.addEventListener('mousedown', (event) => {
        const canvasContain = event.target.closest('canvas');

        if (!canvasContain) return;
        if (!framesList.contains(canvasContain)) return;

        canvasContain.addEventListener('dragstart', onDragStart);
        canvasContain.addEventListener('dragover', onDragOver);
        canvasContain.addEventListener('drop', dropped);
    })

    buttonAdd.addEventListener('click', () => {
        const liFrame = addFrame();
        framesList.append(liFrame);
        listFrames.push(liFrame.querySelector('.frame-canvas'));
        addFrameNumber();
        clearCanvas(canvas, context);
        highlight(liFrame);
        imgUpdate(canvas, listFrames, canvasSize);
    });
    sizeButtons.addEventListener('click', chooseSize);

    tools.addEventListener('click', (event) => {
        const toolContain = event.target.closest('li');

        if (!toolContain) return;
        if (!tools.contains(toolContain)) return;
        if (toolContain.getAttribute('id') === 'clear') {
            const selected = searchSelectedFrame();
            const ctx = selected.getContext('2d');
            clearCanvas(canvas, context);
            clearCanvas(selected, ctx);
            imgUpdate(canvas, listFrames, canvasSize);
        }

        changeTool(toolContain, currentColor);
    });

    penSizesList.addEventListener('click', (event) => {
        const sizeContain = event.target.closest('li');

        if (!sizeContain) return;
        if (!penSizesList.contains(sizeContain)) return;

        changePencilSizes(sizeContain);
    });

    fullscreenButton.addEventListener('click', () => {
        preview.requestFullscreen();
    });

    fps.addEventListener('change', () => localStorage.setItem('fps', fps.value));

    window.addEventListener('keydown', (event) => {
        if (event.key === keys.clear) {
            const selected = searchSelectedFrame();
            const ctx = selected.getContext('2d');
            clearCanvas(canvas, context);
            clearCanvas(selected, ctx);
        } else {
            keyControl(event)
        }
    });
}

export default init();
