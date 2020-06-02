window.addEventListener(
  'load',
  () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    let scale = 4;
    canvas.width = 128;
    canvas.height = 128;

    function imgUpdate() {
      localStorage.setItem(canvas, canvas.toDataURL());
      localStorage.setItem('size', canvas.width);
    }

    function draw(src) {
      const img = new Image();
      img.src = src;
      img.crossOrigin = 'anonymous';
      img.onload = function paintImage() {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        imgUpdate();
      };
    }

    if (localStorage.getItem(canvas)) {
      canvas.width = localStorage.getItem('size');
      canvas.height = localStorage.getItem('size');
      draw(localStorage.getItem(canvas));
    }
    let defaultColor = '#008000';
    let started = false;
    const currrentColor = document.querySelector('#current');
    currrentColor.value = defaultColor;
    document.querySelector('#cur').style.backgroundColor = currrentColor.value;
    let prevColor;

    const flags = {
      pencil: true,
      paintb: false,
      colorPick: false,
    };

    function startDraw(event) {
      if (flags.pencil) {
        const x = Math.floor(event.layerX / scale);
        const y = Math.floor(event.layerY / scale);
        context.beginPath();
        context.moveTo(x, y);
        context.strokeStyle = defaultColor;
        context.lineJoin = 'round';
        context.lineWidth = 1;
        started = true;
      }
    }
    function drawLine(ev) {
      if (started) {
        const x = Math.floor(ev.layerX / scale);
        const y = Math.floor(ev.layerY / scale);
        context.lineTo(x, y);
        context.stroke();
      }
    }
    function finishDraw() {
      if (started) {
        started = false;
        imgUpdate();
      }
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', drawLine);
    canvas.addEventListener('mouseup', finishDraw);

    function updateAll() {
      defaultColor = currrentColor.value;
      document.querySelector('#cur').style.backgroundColor = currrentColor.value;
    }

    function changeColor() {
      prevColor = currrentColor.value;
      document.querySelector('#prev').style.backgroundColor = currrentColor.value;
      currrentColor.addEventListener('change', updateAll, false);
    }


    function colorInput(div) {
      const id = div.getAttribute('id');
      switch (id) {
        case 'color-current':
          changeColor();
          break;
        case 'color-prev':
          defaultColor = prevColor;
          prevColor = currrentColor.value;
          document.querySelector('#cur').style.backgroundColor = defaultColor;
          currrentColor.value = prevColor;
          document.querySelector('#prev').style.backgroundColor = prevColor;
          break;
        case 'color-red':
          defaultColor = '#ff0000';
          changeColor();
          currrentColor.value = defaultColor;
          document.querySelector('#cur').style.backgroundColor = currrentColor.value;
          break;
        case 'color-blue':
          defaultColor = '#0000ff';
          changeColor();
          currrentColor.value = defaultColor;
          document.querySelector('#cur').style.backgroundColor = currrentColor.value;
          break;
        default:
          break;
      }
    }

    const chooseColor = document.querySelector('.colors');

    function chooseColors(event) {
      const colorsContain = event.target.closest('div');

      if (!colorsContain) return;

      if (!chooseColor.contains(colorsContain)) return;

      colorInput(colorsContain);
    }

    chooseColor.addEventListener('click', chooseColors);

    const size = document.querySelectorAll('.button');
    size.forEach((element) => {
      element.addEventListener('click', () => {
        const id = element.getAttribute('id');
        switch (id) {
          case 'size-one':
            canvas.width = 128;
            canvas.height = 128;
            scale = 4;
            draw(localStorage.getItem(canvas));
            imgUpdate();
            break;
          case 'size-twoo':
            canvas.width = 256;
            canvas.height = 256;
            scale = 2;
            draw(localStorage.getItem(canvas));
            imgUpdate();
            break;
          case 'size-three':
            canvas.width = 512;
            canvas.height = 512;
            scale = 1;
            draw(localStorage.getItem(canvas));
            imgUpdate();
            break;
          default:
            break;
        }
      });
    });

    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem(canvas);
    }

    const clearButton = document.querySelector('.clear');

    clearButton.addEventListener('click', clearCanvas, imgUpdate());

    const searchInput = document.querySelector('#search');

    function symbolCheck() {
      let val = searchInput.value;
      const reg = /[0-9А-Яа-я]/g;

      if (reg.test(val)) {
        val = val.replace(reg, '');
        searchInput.value = val;
      }
    }

    searchInput.onfocus = function checking() {
      searchInput.addEventListener('input', symbolCheck);
    };

    const button = document.querySelector('.button-load');

    async function getLinkToImage() {
      let query;
      const clientId = '66885fc7fe227d6764b5742cd81bda6fca31bc5bfd638ead556e1707625b4244';
      const baseUrl = 'https://api.unsplash.com/photos/random';
      if (document.querySelector('#search').value === '') query = 'Minsk';
      else query = document.querySelector('#search').value;

      const queryString = `?query=town,${query}&client_id=${clientId}`;
      const url = baseUrl + queryString;

      let data;
      try {
        const response = await fetch(url);
        data = await response.json();
      } catch (e) {
        console.error(e);
      }
      const linkImage = data.urls.small;
      clearCanvas();
      draw(linkImage);
    }

    button.addEventListener('click', getLinkToImage);

    const blackAndWhite = document.querySelector('.grayscale');

    function grayscale() {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      context.putImageData(imageData, 0, 0);
      imgUpdate();
    }

    blackAndWhite.addEventListener('click', grayscale);
  },
  false,
);
