const themeBtn = document.querySelector(".themebtn");
const themeBtn2 = document.querySelector(".button");
const enL = document.querySelector("#en");
const ruL = document.querySelector("#ru");
const azL = document.querySelector("#az");
const search = document.querySelector("#search");
const day = document.querySelector("#day");
const weatherForm = document.forms.searchCity;
const temperature = document.querySelector("#temperature");
const temperatureD = document.querySelector(".temperature");
const city = document.querySelector("#city");
const time = document.querySelector("#time");
const pressure = document.querySelector("#pressure");
const pressureD = document.querySelector(".pressure");
const wind = document.querySelector("#wind");
const windD = document.querySelector(".wind");
const temp_info = document.querySelector("#temp_info");
const precipitation = document.querySelector("#precipitation");
const precipitationD = document.querySelector(".precipitation");


themeBtn.addEventListener("click", toggleTheme);
themeBtn2.addEventListener("click", toggleTheme);

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const formData = new FormData(weatherForm);
    const cityName = formData.get("city");
    getData(cityName);
  }
});

const getData = async (cityName = "Baku") => {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e2855f0571mshc7d461e7250b498p192f41jsn9a3b1d2c6479",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const result = await fetch(url, options).then((res) => res.json());

  const {
    location: { name, localtime },
    current: { temp_c, precip_mm, feelslike_c, pressure_mb, wind_kph, wind_dir },
  } = result;
  const cityTime = localtime.slice(11);

  const windDirectionMapping = {
    N: "north",
    NNE: "north-northeast",
    NE: "northeast",
    ENE: "east-northeast",
    E: "east",
    ESE: "east-southeast",
    SE: "southeast",
    SSE: "south-southeast",
    S: "south",
    SSW: "south-southwest",
    SW: "southwest",
    WSW: "west-southwest",
    W: "west",
    WNW: "west-northwest",
    NW: "northwest",
    NNW: "north-northwest",
  };

  time.innerText = `Время: ${cityTime}`;
  city.innerText = `Город: ${name}`;
  precipitation.innerText = `${precip_mm}`;
  temp_info.innerText = `${temp_c}° - по ощущениям ${feelslike_c}°`;
  pressure.innerText = `${pressure_mb} mm Hg`;
  windPerSecond = (wind_kph * 1000) / 3600;
  wind.innerText = `${Math.round(windPerSecond)} м/с ${
    windDirectionMapping[wind_dir]
  } - легкий ветерок`;
  temperature.innerText = `${Math.round(temp_c)}°`;
};

getData();