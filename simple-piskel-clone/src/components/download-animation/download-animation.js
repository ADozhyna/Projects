import GIF from 'gif.js-upgrade/dist/gif';
import { listFrames, canvasSize } from '../constants/constants';
import { saveData } from '../frames/frame-operation';

const slider = document.getElementById('fps');

const UPNG = require('upng-js');

const download = require('downloadjs');

document.querySelector('.save-gif').addEventListener('click', () => {
    const fps = 1000 / parseInt(slider.value, 10);
    const gif = new GIF({
        workers: 4,
        quality: 10,
        width: canvasSize.width,
        height: canvasSize.height,
        workerScript: './gif.worker.js',
    });
    for (let i = 0; i < listFrames.length; i += 1) {
        gif.addFrame(listFrames[i], { delay: fps });
    }
    gif.on('finished', (file) => download(file, 'piskel.gif', 'image/gif'));
    gif.render();
})

export default document.querySelector('.save-apng').addEventListener('click', () => {
    const dataArr = [];
    const timeArr = [];
    const fps = Math.floor(1000 / parseInt(slider.value, 10));
    listFrames.map((element) => {
        const dataImg = saveData(element, canvasSize);
        return dataArr.push(dataImg.data.buffer);
    });
    timeArr.length = dataArr.length;
    timeArr.fill(fps);

    const result = UPNG.encode(dataArr, canvasSize.height, canvasSize.width, 0, timeArr);
    download(result, 'piskel.apng', 'image/apng');
});