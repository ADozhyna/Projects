function duplicateImage(frame, context, size) {
    const { width, height } = size;
    const ctx = frame.getContext('2d');
    const imageData = context.getImageData(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);
}

function drawData(canvas, imageData) {
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
}


function draw(src, context) {
    const image = new Image();
    image.src = src;
    image.onload = function () {
        context.drawImage(image, 0, 0);
    };
}

function drawResize(src, context, canvas) {
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    img.onload = function () {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height,
            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
    };
}

export { duplicateImage, drawData, draw, drawResize };
