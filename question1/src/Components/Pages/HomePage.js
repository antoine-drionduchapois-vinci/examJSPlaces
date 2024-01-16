import places from "../../utils/places";


const HomePage = () => {
  const main = document.querySelector('main');

  const bloc1 = places.map(place => `
  <div class="place">
  
    <p>${place.name}</p>
  </div>
`).join('');

  main.innerHTML = bloc1;
};

export default HomePage;
