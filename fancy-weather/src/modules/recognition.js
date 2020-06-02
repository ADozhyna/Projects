window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
/* eslint-disable */
const recognition = new SpeechRecognition();
/* eslint-enable */
const input = document.querySelector('.input');

async function voiceSearch(func) {
  recognition.start();
  let city;
  recognition.addEventListener('result', (event) => {
    city = event.results[0][0].transcript;
    input.value = city;
  });
  recognition.addEventListener('end', async () => {
    const search = city;
    func(search);
    input.value = '';
  });
}

export default voiceSearch;
