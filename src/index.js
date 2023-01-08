import './css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

console.log(fetchCountries);

const inpurEl = document.querySelector('#search-box');
const countryEl = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inpurEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();
  const name = evt.target.value.trim();
  if (!name) {
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length >= 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      } else markupList(data);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function markupList(data) {
  if (data.length >= 2) {
    const markup = data
      .map(data => {
        return `<li class="js-country__list">
          <img src="${data.flags.svg}" alt="${data.flags.svg}" width = "30" heigth='30'>
          ${data.name.common}
          </li>`;
      })
      .join('');
    countryEl.innerHTML = markup;
    countryInfo.innerHTML = '';
  } else {
    const markup = data
      .map(({ flags, name, capital, population, languages }) => {
        return `<div class="card-js">
      <h2>
        <img src="${flags.svg}" alt="${name.common}" width = "45">
        ${name.official}
      </h2>
      <div>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages)}</p>
      </div>
    </div>`;
      })
      .join('');
    countryEl.innerHTML = '';
    countryInfo.innerHTML = markup;
  }
}
