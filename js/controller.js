

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
        this.fetchWeatherData();
    }

    fetchWeatherData(){
        let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + this.model.city +"&limit=5&appid="+ this.model.key;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                let lat = json[0].lat;
                let lon = json[0].lon;
                let url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&lang=ua&appid=8b8256c5c05f81ebeada2d8c1a94e713";
                fetch(url2)
                    .then(response => response.json())
                    .then(json => {
                        this.model.temp = this.ToCelsii(json.main.temp);
                        this.model.icon = json.weather[0].icon;
                        this.model.cond = json.weather[0].main.toLowerCase();
                        this.view.createView();
                    })
            })
            .catch(error => this.view.createViewError());
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
import weatherView from "./view.js";
import weatherModel from "./model.js"
import {key} from "../config.js";

const model = new weatherModel(key);
const view = new weatherView(model);
const weather = new weatherController(model, view);

export default weatherController;