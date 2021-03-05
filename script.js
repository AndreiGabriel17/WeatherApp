const key = "b6d2ed32063e7b840c23e749a5ecaa6c";
const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");


const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);
};

const data = [];

const getCities = () => {
    fetch(`cities.json`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {
                const option = document.createElement("option");
                option.value = city.id;
                option.text = city.name;
                select.appendChild(option);
            });
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


const getWeather = (cityId) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const date = new Date();
            city.innerText = data.name;
            temp.innerText = `${kelvinToCelsius(data.main.temp)} ° C`;
            icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            weatherType.innerText = data.weather[0].description;
            time.innerText = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
            wind.innerText = `Wind: ${data.wind.speed} m/s`;
            humidity.innerText = `Humidity: ${data.main.humidity}%`;
            atmp.innerText = `Atmospheric: ${data.main.pressure} hPa`;
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

getCities();

select.addEventListener("change", function (e) {
    if (document.getElementById("first-option")) {
        let firstOption = document.getElementById("first-option");
        firstOption.remove();
    }
    const cityId = e.target.value;
    getWeather(cityId);
});




