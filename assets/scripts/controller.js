import weatherView from "./view.js";
import weatherModel from "./model.js"

class weatherController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.addInput();
        this.buttonClick();
    }

    buttonClick() {
        document.querySelector('.city-input').addEventListener('change', (e) => {
            if (e.target.classList.contains('city-input')) {
                this.setName(e.target.value);
            }
        });
    }

    addInput(){
        this.view.createInput();
    }
    setName(city) {
        this.view.clear();
        this.view.createBlock(city, (lat, lon) => {
            let url2 = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&lang=ua&appid=8b8256c5c05f81ebeada2d8c1a94e713";
            fetch(url2)
                 .then(response => response.json())
                //.then(json => console.log(json));
                 .then(json => {
                     document.querySelector('#temperature').innerText = this.ToCelsii(json.main.temp);
                     document.querySelector('#condition').innerText = json.weather[0].main;
                     document.querySelector('#weather-pic').src = "https://openweathermap.org/img/wn/"+`${json.weather[0].icon}`+"@2x.png";
                     //console.log(this.ToCelii(json.main.temp)+ "/" + json.weather[0].main + "/" + json.weather[0].icon + json)
                 });
                //json.weather[0].main
        });
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
const key = "8b8256c5c05f81ebeada2d8c1a94e713";
const model = new weatherModel(key);
const view = new weatherView(model);
//weather.createBlock();
const weather = new weatherController(model, view);

export default weatherController;