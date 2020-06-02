const keyboardKeys = [
  ["key", "Backquote", "ё", "Ё", "`", "~"],
  ["key", "Digit1", "1", "!", "1", "!"],
  ["key", "Digit2", "2", '"', "2", "@"],
  ["key", "Digit3", "3", "№", "3", "#"],
  ["key", "Digit4", "4", ";", "4", "$"],
  ["key", "Digit5", "5", "%", "5", "%"],
  ["key", "Digit6", "6", ":", "6", "^"],
  ["key", "Digit7", "7", "?", "7", "&"],
  ["key", "Digit8", "8", "*", "8", "*"],
  ["key", "Digit9", "9", "(", "9", "("],
  ["key", "Digit0", "0", ")", "0", ")"],
  ["key", "Minus", "-", "_", "-", "_"],
  ["key", "Equal", "=", "+", "=", "+"],
  [
    "backspace",
    "Backspace",
    "Backspace",
    "Backspace",
    "Backspace",
    "Backspace"
  ],
  ["tab", "Tab", "Tab", "Tab", "Tab", "Tab"],
  ["key", "KeyQ", "й", "Й", "q", "Q"],
  ["key", "KeyW", "ц", "Ц", "w", "W"],
  ["key", "KeyE", "у", "У", "e", "E"],
  ["key", "KeyR", "к", "К", "r", "R"],
  ["key", "KeyT", "е", "Е", "t", "T"],
  ["key", "KeyY", "н", "Н", "y", "Y"],
  ["key", "KeyU", "г", "Г", "u", "U"],
  ["key", "KeyI", "ш", "Ш", "i", "I"],
  ["key", "KeyO", "щ", "Щ", "o", "O"],
  ["key", "KeyP", "з", "З", "p", "P"],
  ["key", "BracketLeft", "х", "Х", "[", "{"],
  ["key", "BracketRight", "ъ", "Ъ", "]", "}"],
  ["key", "Backslash", "\\", "/", "\\", "|"],
  ["del", "Delete", "Del", "Del", "Del", "Del", "Del"],
  [
    "capslock",
    "CapsLock",
    "CapsLock",
    "CapsLock",
    "CapsLock",
    "CapsLock",
    "CapsLock"
  ],
  ["key", "KeyA", "ф", "Ф", "a", "A"],
  ["key", "KeyS", "ы", "Ы", "s", "S"],
  ["key", "KeyD", "в", "В", "d", "D"],
  ["key", "KeyF", "а", "А", "f", "F"],
  ["key", "KeyG", "п", "П", "g", "G"],
  ["key", "KeyH", "р", "Р", "h", "H"],
  ["key", "KeyJ", "о", "О", "j", "J"],
  ["key", "KeyK", "л", "Л", "k", "K"],
  ["key", "KeyL", "д", "Д", "l", "L"],
  ["key", "Semicolon", "ж", "Ж", ";", ":"],
  ["key", "Quote", "э", "Э", "'", '"'],
  ["enter", "Enter", "Enter", "Enter", "Enter", "Enter"],
  ["shiftLeft", "ShiftLeft", "Shift", "Shift", "Shift", "Shift"],
  ["key", "KeyZ", "я", "Я", "z", "Z"],
  ["key", "KeyX", "ч", "Ч", "x", "X"],
  ["key", "KeyC", "с", "С", "c", "C"],
  ["key", "KeyV", "м", "М", "v", "V"],
  ["key", "KeyB", "и", "И", "b", "B"],
  ["key", "KeyN", "т", "Т", "n", "N"],
  ["key", "KeyM", "ь", "Ь", "m", "M"],
  ["key", "Comma", "б", "Б", ".", "<"],
  ["key", "Period", "ю", "Ю", ",", ">"],
  ["key", "Slash", ".", ",", "/", "?"],
  ["shiftRight", "ShiftRight", "Shift", "Shift", "Shift", "Shift"],
  ["ctrlLeft", "ControlLeft", "Ctrl", "Ctrl", "Ctrl", "Ctrl"],
  ["win", "Win", "Win", "Win", "Win", "Win"],
  ["alt", "AltLeft", "Alt", "Alt", "Alt", "Alt"],
  ["space", "Space", " ", " ", " ", " "],
  ["alt", "AltRight", "Alt", "Alt", "Alt", "Alt"],
  ["ctrl", "ControlRight", "Ctrl", "Ctrl", "Ctrl", "Ctrl"]
];

let wrapper = document.createElement("div");
wrapper.className = "keyboard";

const textarea = document.createElement("textarea");
textarea.setAttribute("type", "textarea");
textarea.setAttribute("autofocus", "true");
textarea.focus();
textarea.id = "textarea";
textarea.setAttribute("placeholder", "to change the language, press ctrl+alt");

let symbolsRu = [];
let symbolsEng = [];
let keys = [];
localStorage.setItem("lang", "en");
let lang = localStorage.getItem("lang");
let isCaps = false;
let selectedDiv;

for (let j = 0; j < keyboardKeys.length; j++) {
  let key = document.createElement("div");
  key.className = keyboardKeys[j][0];
  key.id = keyboardKeys[j][1];
  wrapper.append(key);

  let spanEng = document.createElement("span");
  spanEng.className = "eng";
  if (lang === "en" || lang === null) spanEng.classList.add("on");
  else spanEng.classList.add("off");

  let spanRu = document.createElement("span");
  spanRu.className = "ru";
  if (lang === "ru") spanRu.classList.add("on");
  else spanRu.classList.add("off");

  spanRu.innerHTML = [keyboardKeys[j][2]];
  symbolsRu.push(spanRu);

  spanEng.innerHTML = [keyboardKeys[j][4]];
  symbolsEng.push(spanEng);

  key.append(spanEng);
  key.append(spanRu);
  keys.push(key);
}

document.body.append(textarea);
document.body.append(wrapper);

wrapper.onmousedown = function (event) {
  let div = event.target.closest('div');

  if (!div) return;

  if (!wrapper.contains(div)) return;

  highlight(div);
};

wrapper.onmouseup = function (event) {
  let div = event.target.closest('div');

  if (!div) return;

  if (!wrapper.contains(div)) return;

  removeHighlight(div);
};

keys.forEach(key => {
  key.addEventListener("click", e => {
    let id = key.getAttribute("id");
    switch (id) {
      case "ShiftLeft":
      case "ShiftRight":
      case "AltLeft":
      case "AltRight":
      case "ControlLeft":
      case "ControlRight":
      case "Win":
        textarea.value += "";
        break;
      case "Enter":
        textarea.value += "\n";
        break;
      case "Backspace":
        textarea.value = textarea.value.substring(0, textarea.value.length - 1);
        break;
      case "Delete":
        textarea.value = textarea.value.substring(1);
        break;
      case "Tab":
        textarea.value += "  ";
        break;
      case "CapsLock":
        caps();
        textarea.value += "";
        break;
      default:
        for (let i = 0; i < keyboardKeys.length; i++) {
          if (
            lang === "en" &&
            id === keyboardKeys[i][1] &&
            isCaps &&
            e.shiftKey
          ) {
            textarea.value += keyboardKeys[i][4];
          } else if (
            lang === "ru" &&
            id === keyboardKeys[i][1] &&
            isCaps &&
            e.shiftKey
          ) {
            textarea.value += keyboardKeys[i][2];
          } else if (
            (lang === "en" && id === keyboardKeys[i][1] && isCaps) ||
            (lang === "en" && id === keyboardKeys[i][1] && e.shiftKey)
          ) {
            textarea.value += keyboardKeys[i][5];
          } else if (lang === "en" && id === keyboardKeys[i][1]) {
            textarea.value += keyboardKeys[i][4];
          } else if (
            (lang === "ru" && id === keyboardKeys[i][1] && isCaps) ||
            (lang === "ru" && id === keyboardKeys[i][1] && e.shiftKey)
          ) {
            textarea.value += keyboardKeys[i][3];
          } else if (lang === "ru" && id === keyboardKeys[i][1]) {
            textarea.value += keyboardKeys[i][2];
          }
        }
        break;
    }
  });
});

function highlight(node) {
  selectedDiv = node;
  selectedDiv.classList.add("active");
}

function removeHighlight(node) {
  selectedDiv.classList.remove("active");
}

function checkKeyEvent() {
  let keyName = event.code;
  let letter = document.getElementById(keyName);
  highlight(letter);
}

function changeLang() {
  if (lang === "en") {
    for (let i = 0; i < symbolsEng.length; i++) {
      for (let j = 0; j < symbolsRu.length; j++) {
        symbolsEng[i].classList.add("off");
        symbolsEng[i].classList.remove("on");
        symbolsRu[j].classList.add("on");
        symbolsRu[j].classList.remove("off");
        lang = "ru";
        localStorage.setItem("lang", lang);
      }
    }
  } else if (lang === "ru") {
    for (let i = 0; i < symbolsRu.length; i++) {
      for (let j = 0; j < symbolsEng.length; j++) {
        symbolsRu[i].classList.add("off");
        symbolsRu[i].classList.remove("on");
        symbolsEng[j].classList.add("on");
        symbolsEng[i].classList.remove("off");
        lang = "en";
        localStorage.setItem("lang", lang);
      }
    }
  }
}

function caps() {
  keys.forEach(key => {
    let cl = key.getAttribute("class");
    if (cl == "key") {
      key.classList.add("caps");
      isCaps = true;
    } else if (key.getAttribute("class") == "key caps") {
      key.classList.remove("caps");
      isCaps = false;
    }
  });
}

window.addEventListener("keydown", event => {
  checkKeyEvent();
  switch (event.code) {
    case "AltLeft":
    case "AltRight":
      if (event.ctrlKey) {
        changeLang();
      }
      break;
    case "CapsLock":
      caps();
      break;
  }
});
window.addEventListener("keyup", event => {
  checkKeyEvent();
  removeHighlight();
})
