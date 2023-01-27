const API_KEY = '80f9ca303582bb17fe8952c016f24798';
const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=es`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        speed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        icon: data.weather[0].icon,
        date: getDate()
    }

    Object.keys(weatherData).forEach(key => {
        if(key === 'icon'){
            let icon = 'https://openweathermap.org/img/w/' + weatherData[key] + '.png';
            let iconWeather = document.getElementById('iconWeather');
            iconWeather.setAttribute('src', icon);
        }else{
            document.getElementById(key).textContent = weatherData[key];
        }
    });
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + date.getMonth() + 1).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}