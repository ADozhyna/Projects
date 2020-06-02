import { keys } from '../constants/constants'

function showCover() {
    const coverDiv = document.createElement('div');
    coverDiv.className = 'cover-div';
    document.body.style.overflowY = 'hidden';
    document.body.append(coverDiv);
}

function hideCover() {
    document.querySelector('.cover-div').remove();
    document.body.style.overflowY = '';
}

function showPrompt() {
    showCover();
    const container = document.querySelector('.keys-container');
    const paintbucket = document.querySelector('#paintbucket');
    const pen = document.querySelector('#pen-key');
    const stroke = document.querySelector('#stroke-key');
    const eraser = document.querySelector('#eraser-key');
    const colorpicker = document.querySelector('#colorpicker');
    const clear = document.querySelector('#clear-key');
    container.style.display = 'block';
    paintbucket.value = keys.paintbucket;
    pen.value = keys.pen;
    stroke.value = keys.stroke;
    eraser.value = keys.eraser;
    colorpicker.value = keys.colorpicker;
    clear.value = keys.clear;

    function complete() {
        hideCover();
        container.style.display = 'none';
    }

    document.querySelector('#ok').onclick = () => {
        keys.paintbucket = paintbucket.value || 'b';
        keys.pen = pen.value || 'p';
        keys.stroke = stroke.value || 's';
        keys.eraser = eraser.value || 'e';
        keys.colorpicker = colorpicker.value || 'h';
        keys.clear = clear.value || 'c';
        complete()
    };

    document.querySelector('#cancel').onclick = () => {
        complete();
    };

    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            complete();
        }
    };
}

export default document.querySelector('.show-modal').addEventListener('click', showPrompt);