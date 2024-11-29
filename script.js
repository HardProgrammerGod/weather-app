document.getElementById("getWeatherBtn").addEventListener("click", function() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    const apiKey = "!!!"; // - сюда берем свой токен
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

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
