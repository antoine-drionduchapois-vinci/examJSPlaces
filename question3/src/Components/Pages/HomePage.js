const HomePage = async () => {
  const main = document.querySelector('main');

  const fetchPlaces = async (uri) => {
    try {
      const response = await fetch(uri);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${uri}:`, error);
      throw error;
    }
  };

  try {
    // Wait for the fetchPlaces promise to resolve for /places
    const places = await fetchPlaces('https://places-exam-api.azurewebsites.net/places');

    const bloc1 = `
      <h1>List of Vacation Places</h1>
      <ul>
        ${places.map((place) => `<li>${place.name}</li>`).join('')}
      </ul>
    `;

    main.innerHTML = bloc1;

    // Wait for the fetchPlaces promise to resolve for /recommended
    const recommendedPlace = await fetchPlaces('https://places-exam-api.azurewebsites.net/recommended');

    const recommendedPlaceHTML = `
      <h2>Recommended Vacation Place</h2>
      <p>${recommendedPlace.name}</p>
    `;

    main.innerHTML += recommendedPlaceHTML;
  } catch (error) {
    // Handle error if needed
  }
};

export default HomePage;
