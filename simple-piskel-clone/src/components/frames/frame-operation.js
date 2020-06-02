import { canvasSize, template, listFrames } from '../constants/constants';
import { duplicateImage } from './draw-frame';



function highlight(li) {
  const list = document.querySelectorAll('.frame');
  list.forEach((elem) => elem.classList.remove('active-frame'));
  li.classList.add('active-frame');
}

function saveData(canvas, sizes) {
  const { width, height } = sizes;
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, width, height);
  return imageData;
}

function searchSelectedFrame() {
  const frameListPoint = document.querySelector('.active-frame');
  const canvasFrame = frameListPoint.querySelector('.frame-canvas');
  return canvasFrame;
}

function addFrameNumber() {
  document.querySelectorAll('.frame').forEach((elem, index) => {
    const number = elem.querySelector('.frame-number');
    number.textContent = index + 1;
  })
}

function clearCanvas(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function addFrame() {
  const li = document.createElement('li');
  li.className = 'frame active-frame';
  li.innerHTML = template;
  li.querySelector('.frame-canvas').width = canvasSize.width;
  li.querySelector('.frame-canvas').height = canvasSize.height;
  return li;
}

function deleteFrame(elem) {
  const parent = elem.parentElement;
  const index = listFrames.indexOf(parent.querySelector('.frame-canvas'));
  listFrames.splice(index, 1);
  if (parent.getAttribute('class') === 'frame active-frame') {
    parent.previousElementSibling.classList.add('active-frame');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    clearCanvas(canvas, ctx);
  }
  parent.remove()
}

function operationFrame(elem) {
  const classAttr = elem.getAttribute('class');
  switch (classAttr) {
    case 'delete-frame':
      deleteFrame(elem);
      addFrameNumber();
      break;
    case 'copy-frame': {
      const parentElem = elem.parentElement;
      const newElem = addFrame();
      const parentCanvas = parentElem.querySelector('.frame-canvas');
      const ctx = parentCanvas.getContext('2d');
      const newCanvas = newElem.querySelector('.frame-canvas');
      const index = listFrames.indexOf(parentCanvas);
      listFrames.splice(index, 0, newCanvas);
      parentElem.after(newElem);
      addFrameNumber();
      duplicateImage(newCanvas, ctx, canvasSize);
      highlight(newElem);
      break;
    }
    default:
      break;
  }
}

export { addFrame, addFrameNumber, highlight, clearCanvas, operationFrame, searchSelectedFrame, saveData }