import debounce from 'lodash.debounce';
import { info, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';

import fetchCountries from './fetchCountries.js';
import countryInfoCard from './templates/countryInfoCard.hbs';
import countriesList from './templates/countriesList.hbs';

const refs = {
    input: document.querySelector('#input'),
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
        info('Too many matches found.Please enter a more specific query!');

    } else if (data.length >= 2 && data.length <= 10) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryListMarkup);
    } else {
        error('Sorry, we cannot find country for your query :(');
    };
}


refs.input.addEventListener('input', debounce(findCountry, 500))

