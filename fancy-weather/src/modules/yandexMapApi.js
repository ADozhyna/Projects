import {
  renderCoordinates, renderForecast, renderDate, lang, processingError,
} from './renderData';
import { getWeather, getLinkToImage, getTranslation } from './getData';
import voiceSearch from './recognition';

/* eslint-disable */
const map = function getMap(coordinates) {
  const myMap = new ymaps.Map('map', {
    center: coordinates,
    zoom: 10,
  }, {
    autoFitToViewport: 'always',
    searchControlProvider: 'yandex#search'
  });

  function getCode(cityValue) {
    ymaps.geocode(cityValue, {

      results: 1,
    }).then(async (res) => {
      const firstGeoObject = res.geoObjects.get(0);

      const coords = firstGeoObject.geometry.getCoordinates();

      const bounds = firstGeoObject.properties.get('boundedBy');

      myMap.geoObjects.add(firstGeoObject);
      myMap.setBounds(bounds, {
        checkZoomRange: true,
      });
      /* eslint-enable */
      renderCoordinates(...coords);
      const { city, list } = await getWeather(...coords);
      const descriptionWeather = list[0].weather[0].main;
      localStorage.setItem('description', descriptionWeather);
      localStorage.setItem('timezone', city.timezone);
      getLinkToImage(city.timezone, descriptionWeather);
      renderForecast(city.name, city.country, list);
      renderDate(city.timezone);
      getTranslation(lang.value);
    }).catch(() => {
      document.querySelector('.errors').classList.add('active');
      processingError();
      setTimeout(() => {
        document.querySelector('.errors').classList.remove('active');
      }, 3000);
    });
  }

  const input = document.querySelector('.input');
  const buttonSearch = document.querySelector('#button-search');

  buttonSearch.addEventListener('click', () => {
    const city = input.value;
    getCode(city);
    input.value = '';
  });
  document.querySelector('.input').addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      const city = input.value;
      getCode(city);
      input.value = '';
    }
  });
  document.querySelector('#voice').addEventListener('click', async () => {
    voiceSearch(getCode);
  });
};

export default map;
