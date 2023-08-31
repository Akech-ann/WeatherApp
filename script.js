
const apiKey = 'cc815849e771c12234f8c47700523706';
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('city');
const currentWeatherElement = document.getElementById('weatherInformation');
const forecastContainer = document.getElementById('forecastContainer');
const modeToggle = document.getElementById('mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        fetchWeatherData(cityName);
    }
});

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark');
    sunIcon.style.display = body.classList.contains('dark') ? 'none' : 'inline-block';
    moonIcon.style.display = body.classList.contains('dark') ? 'inline-block' : 'none';
}

modeToggle.addEventListener('click', toggleMode);

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline-block';
}

async function fetchWeatherData(cityName) {
    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
        ]);
        if (currentWeatherResponse.ok && forecastResponse.ok) {
            const currentWeatherData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayCurrentWeather(currentWeatherData);
            displayDailyForecast(forecastData);
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        currentWeatherElement.innerHTML = 'City not found';
        forecastContainer.innerHTML = '';
    }
}

function displayCurrentWeather(currentWeatherData) {
    const currentTemperature = currentWeatherData.main.temp;
    const currentHumidity = currentWeatherData.main.humidity;
    const currentWeatherDescription = currentWeatherData.weather[0].description;
    currentWeatherElement.innerHTML = `
    <h2>Current Weather</h2>
    <p> 🌡  ${currentTemperature}°C</p>
    <p> 💧 ${currentHumidity}% </p>
    <p> 🌤  ${currentWeatherDescription}</p>
`;

}


function displayDailyForecast(forecastData) {
    forecastContainer.innerHTML = '';

    const dailyForecasts = {};

    for (const forecast of forecastData.list) {
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastDay = forecastDate.toLocaleDateString(undefined, { weekday: 'long' });

        if (!dailyForecasts[forecastDay]) {
            dailyForecasts[forecastDay] = forecast;
        }
    }

    for (const day in dailyForecasts) {
        const forecast = dailyForecasts[day];
        const forecastDate = new Date(forecast.dt * 1000);
        const forecastTemperature = forecast.main.temp;
        const forecastHumidity = forecast.main.humidity;
        const forecastWeatherDescription = forecast.weather[0].description;
    
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        const dayElement = document.createElement('p');
        dayElement.classList.add('forecast-day'); // Add a unique class for the day
        dayElement.textContent = day;
        
        forecastItem.appendChild(dayElement);
        
        forecastItem.innerHTML += `
            <p> 🕒  ${forecastDate}</p>
            <p>  🌡 ${forecastTemperature}°C</p>
            <p> 💧  ${forecastHumidity}%</p>
            <p> 🌤  ${forecastWeatherDescription}</p>
        `;
        
        forecastContainer.appendChild(forecastItem);
    }
}    




var moon = document.getElementById("moon");
var body = document.body;

moon.onclick = function () {
    body.classList.toggle("dark");
}




        