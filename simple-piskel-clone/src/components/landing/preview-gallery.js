import { catAnimation, smallSize, animDuration } from '../constants/constants';
import { draw } from '../frames/draw-frame';

const preview = document.querySelector('.function-canvas');
const context = preview.getContext('2d');
const period = animDuration.fast;
let count = 0;
let start;
let next;

preview.width = smallSize.width;
preview.height = smallSize.height;

function step(timestamp) {
    if (!start) {
        start = timestamp
    }

    next = start + period;

    if (next < timestamp) {
        start = timestamp;
        next = start + period;
        const frame = catAnimation;
        draw(frame[count % frame.length], context);
        count += 1;
    }

    requestAnimationFrame(step);
}

export default requestAnimationFrame(step);