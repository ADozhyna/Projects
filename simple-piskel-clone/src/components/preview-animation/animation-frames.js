import { listFrames, canvasSize } from '../constants/constants';
import { saveData } from '../frames/frame-operation';
import { drawData } from '../frames/draw-frame';

const preview = document.querySelector('#preview');
const valueText = document.getElementById('fps-value');
const slider = document.getElementById('fps');
let count = 0;
let period;
let start;
let next;

if (localStorage.getItem('size') !== null) {
    const size = JSON.parse(localStorage.getItem('size'));
    canvasSize.width = size.width;
    canvasSize.height = size.height;
    canvasSize.scale = size.scale;
}

function step(timestamp) {
    if (listFrames.length === 0) return;

    period = 1000 / parseInt(slider.value, 10);

    if (!start) {
        start = timestamp
    }

    next = start + period;

    if (next < timestamp) {
        start = timestamp;
        next = start + period;
        valueText.innerHTML = slider.value;
        const frame = saveData(listFrames[count % listFrames.length], canvasSize);
        drawData(preview, frame);
        count += 1;
    }

    requestAnimationFrame(step);
}

export default requestAnimationFrame(step);



