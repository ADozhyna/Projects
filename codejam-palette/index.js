window.addEventListener(
  'load',
  () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    if (localStorage.getItem(canvas)) {
      const dataURL = localStorage.getItem(canvas);
      const image = new Image();
      image.src = dataURL;
      image.onload = function draw() {
        context.drawImage(image, 0, 0);
      };
    }
    let defaultColor = '#008000';
    let started = false;
    const currrentColor = document.querySelector('#current');
    currrentColor.value = defaultColor;
    document.querySelector('#cur').style.backgroundColor = currrentColor.value;
    let prevColor;
    let selectedTool = document.querySelector('#pencil');

    const flags = {
      pencil: true,
      paintb: false,
      colorPick: false,
    };

    function imgUpdate() {
      localStorage.setItem(canvas, canvas.toDataURL());
    }

    function startDraw(event) {
      if (flags.pencil) {
        const x = event.layerX;
        const y = event.layerY;
        context.beginPath();
        context.moveTo(x, y);
        context.strokeStyle = defaultColor;
        context.lineJoin = 'round';
        context.lineWidth = 4;
        started = true;
      }
    }

    function drawLine(ev) {
      if (flags.pencil) {
        if (started) {
          const x = ev.layerX;
          const y = ev.layerY;
          context.lineTo(x, y);
          context.stroke();
        }
      }
    }

    function finishDraw() {
      if (flags.pencil) {
        if (started) {
          started = false;
          imgUpdate();
        }
      }
    }

    function paintBucket() {
      if (flags.paintb) {
        context.fillStyle = defaultColor;
        context.fillRect(0, 0, 512, 512);
      }
    }

    function colorPicker(event) {
      if (flags.colorPick) {
        const imgData = context.getImageData(event.layerX, event.layerY, 1, 1);
        const rgbColor = imgData.data;
        const colorHex = [];
        rgbColor.map((x) => {
          let hex = x.toString(16);
          if (hex.length === 1) hex = `0${hex}`;
          return colorHex.push(hex);
        });
        colorHex.pop();
        defaultColor = `#${colorHex.join('')}`;
        prevColor = currrentColor.value;
        document.querySelector('#prev').style.backgroundColor = currrentColor.value;
        currrentColor.value = defaultColor;
        document.querySelector('#cur').style.backgroundColor = currrentColor.value;
      }
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousedown', paintBucket);
    canvas.addEventListener('mousedown', colorPicker);
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

    function changeTool(div) {
      if (selectedTool) {
        selectedTool.classList.remove('active');
      }
      selectedTool = div;
      const id = div.getAttribute('id');
      switch (id) {
        case 'paintb':
          flags.paintb = true;
          flags.pencil = false;
          flags.colorPick = false;
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
          flags.pencil = true;
          document.querySelector('#pencil').classList.add('active');
          break;
        case 'transform':
          break;
        default:
          break;
      }
    }

    const tools = document.querySelector('.tools');

    function chooseTools(event) {
      const toolContain = event.target.closest('div');

      if (!toolContain) return;

      if (!tools.contains(toolContain)) return;

      changeTool(toolContain);
    }

    tools.addEventListener('click', chooseTools);

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


    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyB':
          flags.paintb = true;
          flags.pencil = false;
          flags.colorPick = false;
          document.querySelector('#paintb').classList.add('active');
          document.querySelector('#pencil').classList.remove('active');
          document.querySelector('#choose').classList.remove('active');
          break;
        case 'KeyP':
          flags.paintb = false;
          flags.pencil = true;
          flags.colorPick = false;
          document.querySelector('#pencil').classList.add('active');
          document.querySelector('#paintb').classList.remove('active');
          document.querySelector('#choose').classList.remove('active');
          break;
        case 'KeyC':
          flags.paintb = false;
          flags.pencil = false;
          flags.colorPick = true;
          document.querySelector('#pencil').classList.remove('active');
          document.querySelector('#paintb').classList.remove('active');
          document.querySelector('#choose').classList.add('active');
          break;
        default:
          break;
      }
    });
  },
  false,
);
