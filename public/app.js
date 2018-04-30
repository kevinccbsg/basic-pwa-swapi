
const main = document.getElementById('root');

window.addEventListener('load', e => {
  updateCharacters();
});

const articleDataHTML = (data) => {
  return `
    <div>
      <h2>${data.name}</h2>
      <div>
        <ul>
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
