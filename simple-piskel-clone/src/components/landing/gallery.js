import { sprites, smallSize, animDuration } from '../constants/constants';
import { draw } from '../frames/draw-frame';

const canvases = document.querySelectorAll('.sprite-example');
const contextes = [];
const period = animDuration.slow;

let count = 0;
let start;
let next;

for (let i = 0; i < canvases.length; i += 1) {
    canvases[i].width = smallSize.width;
    canvases[i].height = smallSize.height;
    contextes.push(canvases[i].getContext('2d'));
}

function step(timestamp) {
    if (!start) {
        start = timestamp
    }
    next = start + period;

    if (next < timestamp) {
        start = timestamp;
        next = start + period;
        draw(sprites[0][count % sprites[0].length], contextes[0]);
        draw(sprites[1][count % sprites[1].length], contextes[1]);
        draw(sprites[2][count % sprites[2].length], contextes[2]);
        draw(sprites[3][count % sprites[3].length], contextes[3]);
        count += 1;
    }

    requestAnimationFrame(step);
}

export default requestAnimationFrame(step);
