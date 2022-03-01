const picturesEl = document.querySelector(".pictures")
const searchEl = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn")
const resultTitle = document.querySelector(".city-name")
const largeImgContainer = document.querySelector(".largeimg-container");
const placesList = document.querySelector(".places-list")

searchBtn.addEventListener("click", getPlacesBySearch);

searchEl.addEventListener("keyup", (e) => {
    e.preventDefault();

    if(e.keyCode === 13 && searchEl.value !== ""){
        
        
    
        getPlacesBySearch();
    }
})



async function getPlaces(place){
    const response = await fetch(`http://api.geonames.org/search?q=${place}&featureClass=P&country=TR&maxRows=50&type=json&lang=TR&username=captianww`);
    const data = await response.json();

    const places = data.geonames;
    console.log(places);
    return places === null ? []: places;
}

async function getDatas(name){
    picturesEl.innerHTML = ""
    const response = await fetch(`https://pixabay.com/api/?key=25477505-c8d3c60d389f0785469d3f358&q=${name}&image_type=photo&per_page=35`);

    const data = await response.json();
    const pictures = data.hits;


    return pictures === null ? [] : pictures
}

async function getPlacesBySearch(){
    placesList.innerHTML = ""
    picturesEl.innerHTML = ""
    const searchResults = searchEl.value;
    const results = await getPlaces(searchResults);

    console.log(results);
    results.forEach(data => {
        displayPlacesList(data)
    });
    
}

function displayPlacesList(data){
    const placeLi = document.createElement("li");
    placeLi.classList.add("place-li")
    const placeLink = document.createElement("a");
    placeLink.setAttribute("href","#results")
    placeLink.innerHTML = `${data.name}`
    placeLi.addEventListener("click", async () => {
        const searchValue = `${searchEl.value}, ${data.name}`
        const results = await getDatas(searchValue);

        results.forEach(data => {
            showResults(data)
        })
    })
    placeLi.appendChild(placeLink);
    placesList.appendChild(placeLi);
}

function showResults(data){ 

    const picture = document.createElement("li");
    picture.classList.add("image");
    picture.innerHTML = `<img loading="lazy" src="${data.largeImageURL}" alt="">`
    picture.addEventListener("click", () => {
        showLargeImg(data)
    })
    picturesEl.appendChild(picture);

}


function showLargeImg(data) {
    largeImgContainer.innerHTML = ""
    largeImgContainer.classList.remove("hidden")

    const largeImg = document.createElement("div");
    largeImg.classList.add("largeimg");

    largeImg.innerHTML = `
    <button class="close-btn"><i class="fas fa-times"></i></button>
    <img src="${data.largeImageURL}" alt="">`

    const closeBtn = largeImg.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        largeImgContainer.classList.add("hidden")
    })

    largeImgContainer.appendChild(largeImg)
}

