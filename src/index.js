import debounce from 'lodash.debounce';

import fetchCountries from './fetchCountries.js';
import countryInfoCard from './templates/countryInfoCard.hbs';
import countriesList from './templates/countriesList.hbs';

const refs = {
    body: document.querySelector('body'),
    input: document.querySelector('#input'),
    list: document.querySelector('.countries-list'),
    countryInfo: document.querySelector('.country-info')
}

const findCountry = () => {
    refs.countryInfo.innerHTML = '';

    let value = refs.input.value;

    fetchCountries(value).then(data => makeCountryMarkup(data))
}

const makeCountryMarkup = (data) => {
    const countryCardMarkup = countryInfoCard(data);
    const countryListMarkup = countriesList(data);

    if (data.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryCardMarkup);

    } else if (data.length > 10) {
        alert('Too many matches found.Please enter a more specific query!');

    } else if (data.length >= 2 && data.length <= 10) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryListMarkup);
    } else {
        alert('Sorry, we cannot find country for your query :(');
    };
}


refs.input.addEventListener('input', debounce(findCountry, 500))

