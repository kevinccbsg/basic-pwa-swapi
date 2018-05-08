
const main = document.getElementById('root');

const articleDataHTML = (data) => {
  return `
    <div class="character">
      <h2>${data.name}</h2>
      <div>
        <ul class="character-list">
          <li>height: ${data.height}</li>
          <li>gender: ${data.gender}</li>
          <li>birth year: ${data.birth_year}</li>
          <li>Hair color: ${data.hair_color}</li>
        </ul>
      </div>
    </div>
  `;
}; 

const updateCharacters = async () => {
  try {
    const response = await fetch('https://swapi.co/api/people/');
    const body = await response.json();
    const characters = body.results;

    main.innerHTML = characters.map(articleDataHTML).join('\n');
  } catch (err) {
    console.error(err);
  }
};

window.addEventListener('load', e => {
  updateCharacters();
  if ('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('/sw.js');
      console.log(`SW registered`);
    } catch (e) {
      console.log(`SW registered failed`);
      console.error(e);
    }
  } else {
    console.warn('service worker not supported');
  }
});

