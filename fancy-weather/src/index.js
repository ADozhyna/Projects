import './modules/renderBasicStructure';
import './scss/style.scss';
import map from './modules/yandexMapApi';
import {
  getUserLocation, getWeather, getLinkToImage, getTranslation,
} from './modules/getData';
import { placeholder } from './modules/constants';
import {
  renderCoordinates, renderForecast, lang, renderDate,
} from './modules/renderData';
import {
  changeCelsius, changeFarenheit, changeLang,
} from './modules/events';

document.querySelector('#load').addEventListener('click', () => {
  const description = localStorage.getItem('description');
  const timezone = localStorage.getItem('timezone');
  getLinkToImage(timezone, description);
});

const changeLanguages = document.querySelector('#lang');
if (localStorage.getItem('lang') === null) changeLanguages.value = 'en';
else changeLanguages.value = localStorage.getItem('lang');

changeLanguages.addEventListener('change', () => {
  changeLang();
  getTranslation(changeLanguages.value, lang.value);
  lang.value = changeLanguages.value;
  localStorage.setItem('lang', lang.value);
});

const input = document.querySelector('.input');
if (localStorage.getItem('lang') !== null) {
  input.setAttribute('placeholder', placeholder[localStorage.getItem('lang')]);
} else {
  input.setAttribute('placeholder', placeholder.en);
}

const farenheitButton = document.querySelector('#far');
const celsiusButton = document.querySelector('#cel');

if (localStorage.getItem('units') === 'metric' || localStorage.getItem('units') === null) {
  farenheitButton.classList.add('inactive');
} else if (localStorage.getItem('units') === 'imperial') {
  celsiusButton.classList.add('inactive');
}

farenheitButton.addEventListener('click', () => {
  changeCelsius();
});

celsiusButton.addEventListener('click', () => {
  changeFarenheit();
});

async function init() {
  try {
    const { loc, country } = await getUserLocation();
    const location = loc.split(',');
    const { list, city } = await getWeather(...location);

    const descriptionWeather = list[0].weather[0].main;

    localStorage.setItem('description', descriptionWeather);
    localStorage.setItem('timezone', city.timezone);

    renderForecast(city.name, country, list);
    renderDate(city.timezone);
    getTranslation(lang.value);

    /* eslint-disable */
    ymaps.ready(map(location));
    /* eslint-enable */
    renderCoordinates(...location);
    getLinkToImage(city.timezone, descriptionWeather);
  } catch (e) {
    console.log(e);
  }
}

init();
