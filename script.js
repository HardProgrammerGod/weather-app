const loadingSpinner = document.getElementById("loading");

function showSpinner() {
    loadingSpinner.style.display = "flex";
}

function hideSpinner() {
    loadingSpinner.style.display = "none";
}



document.getElementById("getWeatherBtn").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    const apiKey = "!!!"; // берем код апішкі
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    showSpinner();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML = `<p>${error.message}</p>`;
        })
        
        .finally(() => {
            hideSpinner();
        });
});

function displayWeather(data) {
    const weatherInfo = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
