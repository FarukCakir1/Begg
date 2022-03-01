const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşmaba", "Perşembe", "Cuma", "Cumartesi"]
const daysEl = document.querySelector(".days");
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const cityNameEl = document.querySelector(".city-name")

searchBtn.addEventListener("click", getInputData);

let cityName = "İstanbul"



async function getWeatherData() {
    const resp = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ae5081c56dda4f03bbb224141213112&q=${cityName}&days=15&aqi=no&alerts=no`)
    const data = await resp.json()
    
    loadData(data)
}

function loadData(data) {

    cityNameEl.innerText = `${data.location.country}, ${ data.location.region}`
    const newArr = data.forecast.forecastday;
    const HTML = newArr.map(data => {
        const dayName = getDay(data.date)
        return `
            <div class="day">
                <div class="weather-icon"><img src="${data.day.condition.icon}" alt=""></div>
                <div class="body">
                    <span class="celsius">${Math.round(data.day.avgtemp_c)}<span class="celsius-symbol">°C</span></span>
                    <span class="date">${dayName}</span>
                </div>
            </div>`
            }).join("");
        daysEl.innerHTML = HTML   
        
}

function getDay(date){
    const newDate = new Date(date);
    const index = newDate.getDay();
    const day = daysOfWeek[index];

    return day;

}


function getInputData(){
    cityName = searchBar.value;
    
    getWeatherData();
}
window.addEventListener("load", getWeatherData)