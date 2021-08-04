const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const getCities = async () => {
  const response = await fetch (endpoint);
  const citiesList = await response.json();
  cities.push(...citiesList);
}

getCities();

const findMatches = (wordToMatch, cities) => {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  })
}

const displayMatches = (e) => {
  const matches = findMatches(e.target.value, cities)
  const html = matches.map(
    place => {
      const regex = new RegExp(e.target.value, 'gi');
      const cityName = place.city.replace(regex, `<span class="hl">${e.target.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${e.target.value}</span>`);
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
      `;
  }).join('');
  ulSelector.innerHTML = html;
}

/* const displayMatches = (e) => {
  const matches = findMatches(e.target.value, cities);
  const html = matches.map((place) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `
          <span>${place.city} ${place.state}</span>
        `;
    ulSelector.append(liElement);
  });
}; */ //Not working properly



const inputSelector = document.querySelector('.search');
const ulSelector = document.querySelector('.suggestions');
inputSelector.addEventListener('change', displayMatches);
inputSelector.addEventListener('keyup', displayMatches)

