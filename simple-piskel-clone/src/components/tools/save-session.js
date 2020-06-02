function imgUpdate(canvas, frames, sizes) {
    const dataFrames = [];
    frames.forEach(element => {
        dataFrames.push(element.toDataURL());
    });
    localStorage.setItem('canvas', canvas.toDataURL());
    localStorage.setItem('frameCanvas', JSON.stringify(dataFrames));
    localStorage.setItem('size', JSON.stringify(sizes));
}

function drawSession(src, context, canvas) {
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

export { imgUpdate, drawSession }