import { pencilSizes, penSizesValues } from '../constants/constants';

let selected = document.querySelector('.first');

function changePencilSizes(li) {
    if (selected) {
        selected.classList.remove('active');
    }
    selected = li;
    const dataSize = li.getAttribute('data-size');
    switch (dataSize) {
        case '1':
            /* eslint-disable */
            pencilSizes.size = penSizesValues[1];
            li.classList.add('active');
            break;
        case '2':
            pencilSizes.size = penSizesValues[2];
            li.classList.add('active');
            break;
        case '3':
            pencilSizes.size = penSizesValues[3];
            li.classList.add('active');
            break;
        case '4':
            pencilSizes.size = penSizesValues[4];
            li.classList.add('active');
            break;
        /* eslint-enable */
        default:
            break;
    }
}

export { changePencilSizes }
