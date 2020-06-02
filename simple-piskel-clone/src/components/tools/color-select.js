import { defaultColor } from '../constants/constants';

let isPrimary = true;
const currentColor = document.querySelector('#current');
const secondColor = document.querySelector('#secondary');
const chooseColor = document.querySelector('.colors');
const currentBackground = document.querySelector('.primary');
const secondBackground = document.querySelector('.secondary');

currentColor.value = defaultColor.color;
currentBackground.style.backgroundColor = currentColor.value;
secondBackground.style.backgroundColor = secondColor.value;

function updateColor(param1, param2) {
    const rect1 = param1;
    const rect2 = param2;
    rect1.style.backgroundColor = rect2.value;
}

currentColor.addEventListener('change', () => {
    defaultColor.color = currentColor.value;
    updateColor(currentBackground, currentColor);

});

secondColor.addEventListener('change', () => {
    updateColor(secondBackground, secondColor);
});

function changeColor() {
    if (isPrimary) {
        defaultColor.color = secondColor.value;
    } else {
        defaultColor.color = currentColor.value;
    }
}

document.querySelector('.swap-colors').addEventListener('click', () => {
    changeColor();
    if (isPrimary) {
        isPrimary = false;
        updateColor(currentBackground, secondColor);
        updateColor(secondBackground, currentColor);
    } else {
        isPrimary = true;
        updateColor(currentBackground, currentColor);
        updateColor(secondBackground, secondColor);
    }

})

export default chooseColor;

