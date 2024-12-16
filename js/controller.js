
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
        fetch(this.model.getUrl())
            .then(response => response.json())
            .then(json => {
                this.model.lat = json[0].lat;
                this.model.lon = json[0].lon;
                fetch(this.model.getUrl2())
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


export default weatherController;