const apiKey = "06b150e309764102aca155644232707";

let temperature, weather, temp, code; 
const tempBlock = document.querySelector(".temperature");
const weatherBlock = document.querySelector(".weather");
const form = document.querySelector(".form");
const img = document.querySelector(".picture img");
const images = [
               "./assets/sun.png",
               "./assets/cloud.png", 
                "./assets/rain_storm.png", 
                "./assets/rain.png",  
                "./assets/sun_cloud.png", 
                "./assets/sun_rain.png",
                "./assets/snow.png"
               ];

function reset() {
   input.value = "";
   document.querySelector(".city").textContent = "City";
   tempBlock.textContent = "°C";
   weatherBlock.textContent = "Weather";
   img.src="";
}

const btn = document.querySelector(".reset");
const input = document.querySelector(".input");
btn.addEventListener("click", reset);




const showError = () => {
   tempBlock.textContent = "-";
   weatherBlock.textContent = "No such city found";
};

const getPicture = (code, isDay) => {
   if (!isDay) {
      img.src = "./assets/night.png";
   } else {
      switch(code) {
         case 1000:           
            img.src = images[0]; 
            break;
         case 1003:
            img.src = images[4];
            break;
         case 1006:
         case 1009:   
            img.src = images[1];
            break;
         case 1114:
         case 1210:
         case 1213:      
            img.src = images[6];
            break;
         case 1180:
         case 1183:
         case 1240:      
            img.src = images[3];
            break; 
         case 1192:
         case 1189:
         case 1198:
         case 1195:
            img.src = images[2];
         default:
            img.src = images[5];
      }
   }  
    
};


const getData =  async (url) => {
   try{
      await fetch(url)
      .then(res => res.json())
      .then(data => {
         if(data.error) {
            showError();
         }
         isDay = +data.current.is_day;
         code = +data.current.condition.code;
         
         getPicture(code, isDay);
         temperature = +data.current.temp_c;
         temp = temperature > 0 ? "+" : "-";
         tempBlock.textContent = temp + " " + temperature + " °C";
         weatherBlock.textContent = data.current.condition.text; 
      })
   } catch (err) {
      showError();
   }
   
};


const getWeather = (e) => {
    e.preventDefault();
    const cityName = input.value; 
    const queryURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

    getData(queryURL);
    document.querySelector(".city").textContent = cityName[0].toUpperCase() + cityName.substring(1);
}

form.addEventListener("submit", getWeather);



 


