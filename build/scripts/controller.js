import weatherView from "./view.js";
import weatherModel from "./model.js"
import {key} from "../../config.js";

class weatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.addInput();
        this.buttonClick();
        this.displayWeatherData(this.model.city);
    }

    buttonClick() {
        document.querySelector('.city-input').addEventListener('change', (e) => {
            if (e.target.classList.contains('city-input')) {
                this.model.city = e.target.value;
                this.displayWeatherData(this.model.city);
            }
        });

    }

    addInput(){
        this.view.createInput();
    }
    displayWeatherData(city) {
        this.view.clear();
        this.view.createBlock(city, this.model.iconName, (lat, lon) => {
            this.fetchWeatherData(lat, lon);
        });
    }

    fetchWeatherData(lat,lon){
        let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + this.model.city +"&limit=5&appid="+ this.model.key;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                let lat = json[0].lat;
                let lon = json[0].lon;
                let url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&lang=ua&appid=8b8256c5c05f81ebeada2d8c1a94e713";
                //console.log(url2);
                fetch(url2)
                    .then(response => response.json())
                    //.then(json => console.log(json))
                    .then(json => {
                        document.querySelector('#temperature').innerText = this.ToCelsii(json.main.temp);
                        document.querySelector('#condition').innerText = json.weather[0].main;
                        //document.querySelector('#weather-pic').src = "https://openweathermap.org/img/wn/"+`${json.weather[0].icon}`+"@2x.png";
                        document.querySelector('#weather-pic').src = `build/img/condition-bg/icons/${json.weather[0].icon}.png`;
                        let condition = json.weather[0].main.toLowerCase();
                        document.body.classList.add(condition);
                        document.body.style.backgroundImage = `url('build/img/condition-bg/${condition}.webp')`;
                        document.body.style.backgroundSize = "cover";
                        //console.log(this.ToCelii(json.main.temp)+ "/" + json.weather[0].main + "/" + json.weather[0].icon + json)
                    })
                    //.catch(error => console.log(121323232));
                //json.weather[0].main
            })
            .catch(error => document.querySelector("#weather-wrapper").innerHTML = '<span class="error"> Такого міста не існує,<br> спробуйте ще раз</span>');
            //.catch();
    }

    ToCelsii(kelvin) {
        let temp = Math.round(kelvin - 273.15);
        if (temp > 0){
            return "+" + temp;
        }else{
            return temp;
        }
    }


}

const model = new weatherModel(key);
const view = new weatherView(model);
//weather.createBlock();
const weather = new weatherController(model, view);

export default weatherController;