import {
  staticData, months, week, weekAll, placeholder, weatherDescription,
} from './constants';

let units;
if (localStorage.getItem('units') === null) units = 'metric';
else units = localStorage.getItem('units');

function changeCelsius() {
  if (units === 'metric') {
    const deg = document.querySelector('.degree');
    const text = deg.textContent;
    const farenheit = Math.round(((Number(text.substring(0, text.length - 1)) * 9) / 5) + 32);
    deg.textContent = `${farenheit}°`;
    const feels = document.querySelector('.feels-deg');
    const feelsText = feels.textContent;
    const feelsFarenheit = Math.round((feelsText * 9) / 5 + 32);
    feels.textContent = feelsFarenheit;
    const degDays = document.querySelectorAll('.temp-day');
    for (let i = 0; i < degDays.length; i += 1) {
      const textDay = degDays[i].textContent;
      const far = Math.round(((Number(textDay.substring(0, textDay.length - 1)) * 9) / 5) + 32);
      degDays[i].textContent = `${far}°`;
    }
  }
  units = 'imperial';
  localStorage.setItem('units', units);
  document.querySelector('#cel').classList.add('inactive');
  document.querySelector('#far').classList.remove('inactive');
}

function changeFarenheit() {
  if (units === 'imperial') {
    const deg = document.querySelector('.degree');
    const text = deg.textContent;
    const celsius = Math.round((Number(text.substring(0, text.length - 1)) - 32) * (5 / 9));
    deg.textContent = `${celsius}°`;
    const feels = document.querySelector('.feels-deg');
    const feelsText = feels.textContent;
    const feelsCel = Math.round((feelsText - 32) * (5 / 9));
    feels.textContent = feelsCel;
    const degDays = document.querySelectorAll('.temp-day');
    for (let i = 0; i < degDays.length; i += 1) {
      const textDay = degDays[i].textContent;
      const cel = Math.round((Number(textDay.substring(0, textDay.length - 1)) - 32) * (5 / 9));
      degDays[i].textContent = `${cel}°`;
    }
  }
  units = 'metric';
  localStorage.setItem('units', units);
  document.querySelector('#cel').classList.remove('inactive');
  document.querySelector('#far').classList.add('inactive');
}

function changeLang() {
  const statElements = document.querySelectorAll('.static-element');
  Object.keys(staticData).forEach((key) => {
    if (key === document.querySelector('#lang').value) {
      for (let i = 0; i < staticData[key].length; i += 1) {
        statElements[i].innerText = staticData[key][i];
      }
    }
  });

  Object.keys(placeholder).forEach((key) => {
    if (key === document.querySelector('#lang').value) {
      document.querySelector('.input').setAttribute('placeholder', placeholder[key]);
    }
  });

  const changeLanguage = document.querySelector('#lang');
  const monthName = document.querySelector('.month');
  const value = monthName.textContent;
  let keyName;
  if (localStorage.getItem('lang') === null) keyName = 'en';
  else keyName = localStorage.getItem('lang');
  let index = months[keyName].indexOf(value);
  monthName.innerText = months[changeLanguage.value][index];

  const dayName = document.querySelector('.small-day');
  index = week[keyName].indexOf(dayName.textContent);
  dayName.innerText = week[changeLanguage.value][index];

  const dayNameLong = document.querySelectorAll('.day-week');
  for (let i = 0; i < dayNameLong.length; i += 1) {
    index = weekAll[keyName].indexOf(dayNameLong[i].textContent);
    dayNameLong[i].innerText = weekAll[changeLanguage.value][index];
  }

  const description = document.querySelector('#description');
  const id = localStorage.getItem('weatherId');
  if (changeLanguage.value === 'en') [description.textContent] = weatherDescription[id];
  else if (changeLanguage.value === 'ru') [, description.textContent] = weatherDescription[id];
  else if (changeLanguage.value === 'be') [, , description.textContent] = weatherDescription[id];
}

export {
  changeCelsius, changeFarenheit, changeLang,
};
