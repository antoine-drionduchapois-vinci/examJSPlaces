import places from "../../utils/places";



const PhotosPage = () => {



    let index = 3;


    const updateHTML = () => {
        const main = document.querySelector('main');
        const bloc1 = `
          <img src="${places[index].image}" alt="${places[index].name}">
          <p>${places[index].name}</p>
          <button onclick="window.next()">Next</button>
          <button onclick="window.previous()">Previous</button>`;
    
        main.innerHTML = bloc1;
      };

      
    window.next = () => {
        console.log("next");
        index = (index + 1) % places.length;
        updateHTML();
      };
    
      window.previous = () => {
        console.log("previous");
        index = (index - 1 + places.length) % places.length;
        updateHTML();
      };
    
    

      updateHTML();


};


export default PhotosPage;
