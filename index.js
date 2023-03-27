const API_KEY = '461d759eac5250445e5ea5f2e10452db';

//log recibe la data (la posicion) del usuario
const FetchData = position => {
  //meto en constantes la latitud y longitud
  const { latitude, longitude } = position.coords;
  //console.log(position);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    // .then((data) => console.log(data)); //aqui revisamos que si nos traiga la informacion en la consola
    .then(data =>  setWeatherData(data))

  
}
//Para mostrar la información al usuario

const setWeatherData = data => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    temperatureMax: data.main.temp_max,
    temperatureMin: data.main.temp_min,
    date: getDate(),
  }

  Object.keys(weatherData).forEach( key => {
    //pintamos la informacion en el html
    document.getElementById(key).textContent = weatherData[key];
  } );
}
//Para obtener la fecha 
const getDate = ()=> {
  let date = new Date();
  return`${date.getDate()}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`
}

//Para saber ,la ubicación del usuario
const carga = () => {
  navigator.geolocation.getCurrentPosition(FetchData)
}