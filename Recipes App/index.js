const randomMealdiv = document.querySelector(".random-meal");
const favMeals = document.querySelector(".fav-meals");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const resultsEl = document.querySelector(".results");
const mealInfo = document.querySelector(".meal-info");
searchBtn.addEventListener("click", getSearchValue);

getRandomData();
fetchFavMeal();


async function getRandomData() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")

    const data = await response.json();
    const randomMeal = data.meals[0];

    console.log(randomMeal);

    loadRandomMeal(randomMeal, true)

}

async function getDataById(id) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)

    const data = await response.json();
    const mealById = data.meals[0];

    return mealById
}

async function getDataByName(name) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)

    const data = await response.json();
    const meals = data.meals;


    return meals === null ? [] : meals

}

async function getSearchValue() {

    const searchValue = search.value;

    const results = await getDataByName(searchValue);
    resultsEl.innerHTML = ""
    results.forEach(mealData => {
        displaySearchResult(mealData)
    })



}

function loadRandomMeal(mealData, random = false) {

    const randomDiv = document.createElement("div");
    randomDiv.classList.add("random-section")

    randomDiv.innerHTML = `
        <span class="random-recipe">Daily Recipe</span>
        <img src="${mealData.strMealThumb}" alt="">
        <div class="meal-body">
            <span class="meal-name">${mealData.strMeal}</span>
            <button class="like-btn"><i class="fas fa-heart"></i></button>
        </div>
    `
    
    randomDiv.addEventListener("click", () => {
        showMealInfo(mealData);
        mealInfo.classList.remove("hidden")
    })
    const favBtn = randomDiv.querySelector(".like-btn");
    favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains("active")) {
            removemealLs(mealData.idMeal)
            favBtn.classList.remove("active")
            fetchFavMeal()
        } else {
            addMealLs(mealData.idMeal);
            favBtn.classList.add("active")
            fetchFavMeal()
        }

    })

    randomMealdiv.appendChild(randomDiv);

}

function displaySearchResult(mealData) {

    const searchResult = document.createElement("div");
    searchResult.classList.add("random-section")

    searchResult.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="">
        <div class="meal-body">
            <span class="meal-name">${mealData.strMeal}</span>
            <button class="like-btn"><i class="fas fa-heart"></i></button>
        </div>
    `

    searchResult.addEventListener("click", () => {
        showMealInfo(mealData);
        mealInfo.classList.remove("hidden")
    })
    const favBtn = searchResult.querySelector(".like-btn");
    favBtn.addEventListener("click", () => {
        if (favBtn.classList.contains("active")) {
            removemealLs(mealData.idMeal)
            favBtn.classList.remove("active")
            fetchFavMeal()
        } else {
            addMealLs(mealData.idMeal);
            favBtn.classList.add("active")
            fetchFavMeal()
        }

    })

    resultsEl.appendChild(searchResult);

}



function addFavMeals(mealData) {
    const meal = document.createElement("li");
    meal.classList.add("meals")

    meal.innerHTML = `
        <div class="meal">
            <i class="fas fa-times delete-fav-meal"></i>
            <img src="${mealData.strMealThumb}" alt="">
            <div class="fav-meal-name">${mealData.strMeal}</div>
        </div>`

    
        meal.addEventListener("click", () => {
            showMealInfo(mealData);
            mealInfo.classList.remove("hidden")
        })
    const deleteBtn = meal.querySelectorAll(".delete-fav-meal");
    deleteBtn.forEach(btn => btn.addEventListener("click", () => {
        removemealLs(mealData.idMeal);
        fetchFavMeal()
    }))
    favMeals.appendChild(meal);
}

function showMealInfo(mealData){

    const ingsAndMeasures = [];

    for(let i = 1; i <= 20; i++){
        if(mealData["strIngredient" + i]){
            ingsAndMeasures.push(`${mealData["strIngredient" + i]} / ${mealData["strMeasure" + i]}`);
            
        }

    }
    
    mealInfo.innerHTML = `
    <div class="info">
        <button class=" close-info"><i class="fas fa-times"></i></button>
        <div class="info-title">${mealData.strMeal}</div>
        <div class="info-img"><img src="${mealData.strMealThumb}" alt=""></div>
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul class="ingredients">
            ${ingsAndMeasures.map(el => `<li>${el}</li>`).join("")}
        </ul>
    </div>`

   const closeBtn = mealInfo.querySelector(".close-info")
   closeBtn.addEventListener("click", () => {
       mealInfo.classList.add("hidden");
   })
    
}

async function fetchFavMeal() {
    favMeals.innerHTML = ""
    const ids = getMealLs()

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        mealById = await getDataById(id)

        addFavMeals(mealById)
    }
}

function addMealLs(id) {
    const mealIdArr = getMealLs();

    localStorage.setItem("mealIdArr", JSON.stringify([...mealIdArr, id]))
}

function removemealLs(id) {
    const mealIdArr = getMealLs();

    localStorage.setItem("mealIdArr", JSON.stringify(mealIdArr.filter(mealId => mealId !== id)))
}

function getMealLs() {
    mealIdArr = JSON.parse(localStorage.getItem("mealIdArr"));

    return mealIdArr === null ? [] : mealIdArr;
}