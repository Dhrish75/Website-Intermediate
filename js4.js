document.addEventListener('DOMContentLoaded', () => {
            const key = "9cb601b38dbab8efb38640aad5fde85b";
            const searchBar = document.querySelector(".searchbar input");
            const searchButn = document.getElementById("presse");
            const weatherPhoto = document.getElementsByClassName("weather-photo");

            async function gettemp(city) {
                console.log("Getting data for city:", city);
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
                try {
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        if (response.status === 404) {
                            console.error("City not found");
                            alert("City not found. Please check the city name and try again.");
                        } else if (response.status === 401) {
                            console.error("Invalid API key");
                            alert("Invalid API key. Please check your API key.");
                        } else {
                            console.error(`Error: ${response.statusText}`);
                            alert(`Error: ${response.statusText}`);
                        }
                        return;
                    }

                    const data = await response.json();
                    console.log(data);

                    document.querySelector(".place").innerHTML = data.name;
                    document.querySelector(".tempe").innerHTML = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                    document.querySelector(".wind").innerHTML = data.wind.speed + "KPH";
                    
                   
                    switch(data.weather[0].main) {
                        case 'Haze' :
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/1779/1779862.png";
                            break;
                        case "Clouds":
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/5903/5903939.png";
                            break;
                        case "Rain":
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/1332/1332316.png";
                            break;
                        case "Clear":
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/3222/3222807.png";
                            break;
                        case "Snow":
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/6635/6635320.png";
                            break;
                        case "Mist":
                            weatherPhoto.src = "https://cdn-icons-png.flaticon.com/512/414/414859.png";
                            break;
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                    alert("An error occurred while fetching the data. Please try again.");
                }
            }

            searchButn.addEventListener('click', () => {
                const city = searchBar.value.trim();
                if (city) {
                    gettemp(city);
                } else {
                    alert("Please enter a city name.");
                }
            });
        });