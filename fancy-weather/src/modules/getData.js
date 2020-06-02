async function getUserLocation() {
  const LOCATION_API_TOKEN = '6ca2bc9e374b0c';

  return fetch(`https://ipinfo.io/json?token=${LOCATION_API_TOKEN}`).then((response) => response.json());
}

async function getWeather(lat, lon) {
  const WEATHER_API_TOKEN = '1e6dd08b3203b2176d205376ba15ee0f';
  let units;
  if (localStorage.getItem('units') === null) units = 'metric';
  else units = localStorage.getItem('units');
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=en&units=${units}&APPID=${WEATHER_API_TOKEN}`;
  const response = await fetch(url);
  const forecast = await response.json();
  return forecast;
}

async function getLinkToImage(timezone, description) {
  const clientId = '66885fc7fe227d6764b5742cd81bda6fca31bc5bfd638ead556e1707625b4244';
  const baseUrl = 'https://api.unsplash.com/search/photos?page=1&per_page=100&orientation=landscape';
  const locTime = new Date();
  const month = locTime.getMonth();
  let queryMonth;
  if (month === 0 || month === 1 || month === 11) queryMonth = 'winter';
  else if (month === 2 || month === 3 || month === 4) queryMonth = 'spring';
  else if (month === 5 || month === 6 || month === 7) queryMonth = 'summer';
  else queryMonth = 'autumn';

  const timezoneOffset = timezone / 3600;
  const ms = locTime.getTime() + (locTime.getTimezoneOffset() * 60000) + timezoneOffset * 3600000;
  const time = new Date(ms);
  const hours = time.getHours();
  let queryTime;
  if (hours < 6 && hours >= 0) queryTime = 'night';
  else if (hours <= 12 && hours >= 6) queryTime = 'morning';
  else if (hours <= 18 && hours > 12) queryTime = 'afternoon';
  else queryTime = 'evening';

  const queryString = `&query=${description}-${queryMonth}-${queryTime}&client_id=${clientId}`;
  const url = baseUrl + queryString;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.error(e);
  }
  const { results } = data;
  const max = results.length - 1;
  const index = Math.floor(Math.random() * max);
  const src = results[index].urls.regular;
  document.querySelector('.wrapper').style.backgroundImage = `url(${src})`;
}

async function getTranslation(param1, param2) {
  const lang1 = param1;
  let lang2 = param2;
  const API_KEY = 'trnsl.1.1.20191212T100504Z.8207c4d36b2069f8.42a6cc0feb168d4e28196ef4fd3bbe906ac67d54';
  const title = document.querySelector('h1').textContent;
  if (!param2) lang2 = 'en';
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${title}&lang=${lang2}-${lang1}`;
  const response = await fetch(url);
  const translate = await response.json();
  const { text } = translate;
  document.querySelector('h1').textContent = text;
}

export {
  getUserLocation, getWeather, getLinkToImage, getTranslation,
};
