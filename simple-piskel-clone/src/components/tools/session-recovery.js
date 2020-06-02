import { drawSession } from './save-session';
import { listFrames, canvasSize } from '../constants/constants';
import { addFrameNumber, addFrame } from '../frames/frame-operation';

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const frame = document.querySelector('.frame');
const framesList = document.querySelector('.frames');

function sessionRecovery(frames) {
    let li;
    for (let i = 0; i < frames.length; i += 1) {
        li = addFrame();
        const canvasFrame = li.querySelector('.frame-canvas');
        const ctx = canvasFrame.getContext('2d');
        li.className = 'frame';
        listFrames.push(canvasFrame);
        framesList.append(li);
        drawSession(frames[i], ctx, canvasFrame);
        addFrameNumber();
    }

    li.classList.add('active-frame');
}

if (localStorage.getItem('canvas') !== null) {
    const frames = JSON.parse(localStorage.getItem('frameCanvas'));
    const size = JSON.parse(localStorage.getItem('size'));
    canvasSize.width = size.width;
    canvasSize.height = size.height;
    canvasSize.scale = size.scale;

    drawSession(localStorage.getItem('canvas'), context, canvas);
    frame.remove();
    listFrames.shift();
    sessionRecovery(frames);
}

export default framesList;