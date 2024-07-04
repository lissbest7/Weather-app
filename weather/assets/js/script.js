const themeBtn = document.querySelector(".themebtn");
const themeBtn2 = document.querySelector(".button");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
themeBtn2.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const weatherForm = document.forms.searchCity;
const temperature = document.querySelector("#temperature");
const city = document.querySelector("#city");
const time = document.querySelector("#time");
const pressure = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const temp_info = document.querySelector("#temp_info");
const precipitation = document.querySelector("#precipitation");


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

  time.innerText = `Time: ${cityTime}`;
  city.innerText = `City: ${name}`;
  precipitation.innerText = `${precip_mm}`;
  temp_info.innerText = `${temp_c}° - feels like ${feelslike_c}°`;
  pressure.innerText = `${pressure_mb} mm Hg`;
  windPerSecond = (wind_kph * 1000) / 3600;
  wind.innerText = `${Math.round(windPerSecond)} m/s ${
    windDirectionMapping[wind_dir]
  } - light wind`;
  temperature.innerText = `${Math.round(temp_c)}°`;
};

getData();

