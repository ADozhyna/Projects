import {
  data, months, week, weekAll, staticData, weatherDescription,
} from './constants';

const lang = {
  value: 'en',
};

if (localStorage.getItem('lang') !== null) {
  lang.value = localStorage.getItem('lang');
}


function readWeather(arr) {
  const weather = {};
  weather.currentTemp = arr[0].main.temp;
  weather.feelsLike = arr[0].main.feels_like;
  weather.humidity = arr[0].main.humidity;
  weather.wind = arr[0].wind.speed;
  weather.iconId = arr[0].weather[0].id;
  localStorage.setItem('weatherId', weather.iconId);
  return weather;
}

function renderDate(timezone) {
  const timezoneOffset = timezone / 3600;
  const locTime = new Date();
  const ms = locTime.getTime() + (locTime.getTimezoneOffset() * 60000) + timezoneOffset * 3600000;
  const time = new Date(ms);
  let hours = time.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = time.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let weekDay;
  Object.keys(week).forEach((key) => {
    if (key === lang.value) weekDay = week[key][time.getDay()];
  });
  const year = time.getFullYear();
  let month;
  Object.keys(months).forEach((key) => {
    if (key === lang.value) month = months[key][time.getMonth()];
  });
  const day = time.getDate();
  const dateString = `<span class="small-day">${weekDay}</span> ${day} <span class="month">${month}</span> ${year} ${hours}:${minutes}`;
  document.querySelector('.day').innerHTML = dateString;
  setInterval(() => {
    renderDate(localStorage.getItem('timezone'));
  }, 60000);
}

function renderCoordinates(coord1, coord2) {
  let lat;
  let lon;
  Object.keys(staticData).forEach((key) => {
    if (key === lang.value) {
      [, , , , lat, lon] = staticData[key];
    }
  });
  let latitude;
  let longitude;
  if (typeof coord1 === 'number' && typeof coord2 === 'number') {
    const latDegree = Math.trunc(coord1);
    const latMin = Math.trunc((coord1 - latDegree) * 60);
    latitude = `${latDegree}°${latMin}'`;
    const lonDegree = Math.trunc(coord2);
    const lonMin = Math.trunc((coord2 - lonDegree) * 60);
    longitude = `${lonDegree}°${lonMin}'`;
  } else {
    const latDegree = Math.trunc(Number(coord1));
    const latMin = Math.trunc((Number(coord1) - latDegree) * 60);
    latitude = `${latDegree}°${latMin}'`;
    const lonDegree = Math.trunc(Number(coord2));
    const lonMin = Math.trunc((Number(coord2) - lonDegree) * 60);
    longitude = `${lonDegree}°${lonMin}'`;
  }
  const templateCoord = `<p id="lat"><span class="static-element">${lat}</span>: ${latitude}</p>
                         <p id="lon"><span class="static-element">${lon}</span>: ${longitude}</p> `;
  document.querySelector('.coordinates').innerHTML = templateCoord;
}

function renderForecast(city, country, arr) {
  const weather = readWeather(arr);
  const {
    currentTemp, humidity, wind, iconId, feelsLike,
  } = weather;

  let fullCountry;
  Object.keys(data).forEach((key) => {
    if (key === country) {
      fullCountry = data[key];
    }
  });

  /* forecast three days */
  const dayWeek = [];
  const forecastDeg = [];
  const iconSrc = [];

  for (let i = 8; i <= 24; i += 8) {
    const dateForecast = arr[i].dt_txt.split(' ').slice(0, 1);
    const nowDate = new Date(dateForecast);
    Object.keys(weekAll).forEach((key) => {
      if (key === lang.value) dayWeek.push(weekAll[key][nowDate.getDay()]);
    });
    forecastDeg.push(Math.round(arr[i].main.temp));

    const forecastImgId = arr[i].weather[0].id;
    iconSrc.push(forecastImgId);
  }

  let weenSpeed;
  let unit;
  let feels;
  let hum;

  Object.keys(staticData).forEach((key) => {
    if (key === lang.value) {
      [weenSpeed, unit, feels, hum] = staticData[key];
    }
  });

  let descr;
  if (lang.value === 'en') [descr] = weatherDescription[iconId];
  else if (lang.value === 'ru') [, descr] = weatherDescription[iconId];
  else if (lang.value === 'be') [, , descr] = weatherDescription[iconId];

  const template = `<h1>${city}, ${fullCountry}</h1>
  <p class="day"></p>
  <div class="temperature">
    <p class="degree">${Math.round(currentTemp)}°</p>
    <div class="description">
      <span class="weather-icon"><i class="owf owf-${iconId} owf-5x"></i></span>
      <p id="description">${descr}</p>
      <p><span class="static-element">${weenSpeed}</span>: ${wind} <span class="static-element">${unit}</span></p>
      <p><span class="static-element">${feels}</span>: <span class="feels-deg">${Math.round(feelsLike)}</span>°</p>
      <p><span class="static-element">${hum}</span>: ${humidity}%</p>
    </div>
  </div>
  <div class="forecast">
    <div class="forecast-block">
      <p class="day-week">${dayWeek[0]}</p>
      <div class="deg">
        <p class="temp-day">${forecastDeg[0]}°</p>
        <span class="weather-icon"><i class="owf owf-${iconSrc[0]} owf-3x"></i></span>
      </div>
    </div>
    <div class="forecast-block">
      <p class="day-week">${dayWeek[1]}</p>
      <div class="deg">
        <p class="temp-day">${forecastDeg[1]}°</p>
        <span class="weather-icon"><i class="owf owf-${iconSrc[1]} owf-3x"></i></span>
      </div>
    </div>
    <div class="forecast-block">
      <p class="day-week">${dayWeek[2]}</p>
      <div class="deg">
        <p class="temp-day">${forecastDeg[2]}°</p>
        <span class="weather-icon"><i class="owf owf-${iconSrc[2]} owf-3x"></i></span>
      </div>
    </div>
  </div>
  `;
  document.querySelector('.weather').innerHTML = template;
}

function processingError() {
  let error;
  if (lang.value === 'en') {
    error = '<p>city&ensp;not&ensp;found!</p>';
  } else if (lang.value === 'ru') {
    error = '<p>город&ensp;не&ensp;найден!</p>';
  } else if (lang.value === 'be') {
    error = '<p>горад&ensp;не&ensp;знойдзены!</p>';
  }
  document.querySelector('.errors').innerHTML = error;
}

export {
  renderCoordinates, renderForecast, lang, renderDate, processingError,
};
