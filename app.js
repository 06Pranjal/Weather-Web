let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value.trim() !== '') {
        searchWeather();
    }
});

const searchWeather = async () => {
    try {
        const response = await fetch(url + '&q=' + valueSearch.value);
        const data = await response.json();
        
        if (data.cod == 200) {
            city.querySelector('figcaption').innerHTML = data.name;
            city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
            temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            temperature.querySelector('span').innerText = `${data.main.temp} °C`;
            description.innerText = data.weather[0].description;
            clouds.innerText = `${data.clouds.all}% cloudiness`;
            humidity.innerText = `${data.main.humidity}% humidity`;
            pressure.innerText = `${data.main.pressure} hPa`;
            main.classList.remove('error');
        } else {
            handleError();
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        handleError();
    } finally {
        valueSearch.value = '';  // Clear search box after search
    }
};

const handleError = () => {
    main.classList.add('error');
    setTimeout(() => {
        main.classList.remove('error');
    }, 2000);  // Error visible for 2 seconds
};

// Search default
const initApp = () => {
    valueSearch.value = 'India,in';
    searchWeather();
};

initApp();
