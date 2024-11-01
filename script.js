let searchLocation = "Slovenia";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");
let units = 1;
let tempUnit = " °C";
let speed = " km/h"


async function weatherAPI(city){
    if (units === 1) {
        const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=current&key=GWDD8BEJWUQ47TCQW86JL6T2K&contentType=json`);
        const response = await weather.json();
        console.log(response);
        return response.currentConditions;
        
    }
    if (units === 0) {
        const weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=us&include=current&key=GWDD8BEJWUQ47TCQW86JL6T2K&contentType=json`);
        const response = await weather.json();
        console.log(response);
        return response.currentConditions;
    }
 
}


async function getDataFromJSON(city){
    const data = await weatherAPI(city);
 
    const temp = data.temp;
    const feel = ("Feel:   " + data.feelslike);
    const wind = ("Wind:   " + data.windspeed);
    const humidity = ("Humidity:   " + data.humidity);
    const conditions = data.conditions;

    displayData(temp,feel,wind,humidity,conditions,city)
}
getDataFromJSON(searchLocation);


searchBtn.addEventListener("click", function(){
    if(searchInput.value){
    searchLocation = searchInput.value;
    console.log(searchLocation);
    }
    else{
    searchLocation = "Slovenia";
    console.log(searchLocation);
    }
    getDataFromJSON(searchLocation);
})

function displayData(temp,feel,wind,humidity,conditions,city){
    const titleDOM = document.getElementById("title");
    const tempDOM = document.getElementById("temp");
    const feelDOM = document.getElementById("feel");
    const windDOM = document.getElementById("wind");
    const humiDOM = document.getElementById("humi");
    const condiDOM = document.getElementById("description");
    const TunitDOM = document.getElementById("Tunit");

    titleDOM.textContent = city;
    tempDOM.textContent = temp;
    feelDOM.textContent = (feel + tempUnit);
    windDOM.textContent = (wind + speed);
    humiDOM.textContent = (humidity + " %");
    condiDOM.textContent = conditions;
    TunitDOM.textContent = tempUnit;
}
const switchmetric = document.getElementById("metric");
const switchus = document.getElementById("us");

switchmetric.addEventListener("click", function(){
        units = 1;
        tempUnit = " °C";
        speed = " km/h"
        getDataFromJSON(searchLocation);
});

switchus.addEventListener("click", function(){
        units = 0;
        tempUnit = " °F";
        speed = " mph"
        getDataFromJSON(searchLocation);
});