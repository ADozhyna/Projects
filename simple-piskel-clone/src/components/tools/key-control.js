import { flags, defaultColor, keys } from '../constants/constants';

const currentColor = document.querySelector('#current');

function keyControl(event) {
    switch (event.key) {
        case keys.paintbucket:
            flags.paintb = true;
            flags.pencil = false;
            flags.colorPick = false;
            flags.stroke = false;
            document.querySelectorAll('.tool').forEach((element) => element.classList.remove('active'));
            document.querySelector('#paintb').classList.add('active');
            defaultColor.color = currentColor.value;
            break;
        case keys.pen:
            flags.paintb = false;
            flags.pencil = true;
            flags.colorPick = false;
            flags.stroke = false;
            document.querySelectorAll('.tool').forEach((element) => element.classList.remove('active'));
            document.querySelector('#pencil').classList.add('active');
            defaultColor.color = currentColor.value;
            break;
        case keys.colorpicker:
            flags.paintb = false;
            flags.pencil = false;
            flags.colorPick = true;
            flags.stroke = false;
            document.querySelectorAll('.tool').forEach((element) => element.classList.remove('active'));
            document.querySelector('#choose').classList.add('active');
            defaultColor.color = currentColor.value;
            break;
        case keys.eraser:
            flags.paintb = false;
            flags.pencil = true;
            flags.colorPick = false;
            flags.stroke = false;
            document.querySelectorAll('.tool').forEach((element) => element.classList.remove('active'));
            document.querySelector('#eraser').classList.add('active');
            defaultColor.color = 'rgba(68, 68, 68, 1)';
            break;
        case keys.stroke:
            flags.paintb = false;
            flags.pencil = false;
            flags.colorPick = false;
            flags.stroke = true;
            document.querySelectorAll('.tool').forEach((element) => element.classList.remove('active'));
            document.querySelector('#stroke').classList.add('active');
            defaultColor.color = currentColor.value;
            break;
        default:
            break;
    }
};

export { keyControl };