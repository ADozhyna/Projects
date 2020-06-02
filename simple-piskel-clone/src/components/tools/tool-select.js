import { flags, defaultColor } from '../constants/constants';

let selectedTool = document.querySelector('#pencil');

function changeTool(li, currentColor) {
    if (selectedTool) {
        selectedTool.classList.remove('active');
    }
    selectedTool = li;
    const id = li.getAttribute('id');
    switch (id) {
        case 'paintb':
            flags.paintb = true;
            flags.pencil = false;
            flags.colorPick = false;
            defaultColor.color = currentColor.value;
            document.querySelector('#paintb').classList.add('active');
            break;
        case 'choose':
            flags.paintb = false;
            flags.pencil = false;
            flags.colorPick = true;
            document.querySelector('#choose').classList.add('active');
            break;
        case 'pencil':
            flags.paintb = false;
            flags.colorPick = false;
            flags.pencil = true;
            defaultColor.color = currentColor.value;
            document.querySelector('#pencil').classList.add('active');
            break;
        case 'eraser':
            flags.paintb = false;
            flags.colorPick = false;
            flags.pencil = true;
            defaultColor.color = 'rgba(68, 68, 68, 1)';
            document.querySelector('#eraser').classList.add('active');
            break;
        case 'stroke':
            flags.paintb = false;
            flags.colorPick = false;
            flags.pencil = false;
            flags.stroke = true;
            defaultColor.color = currentColor.value;
            document.querySelector('#stroke').classList.add('active');
            break;
        default:
            break;
    }
}

export { changeTool };
