import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(name) {
  const options = 'name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/${name}?fields=${options}`)
    .then(resp => {
      if (!resp.ok) {
        console.log(resp);
        throw new Error(response.statusText);
      }
      return resp.json();
    })
    .catch(err => Notify.failure('Oops, there is no country with that name'));
}
