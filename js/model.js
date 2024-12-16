class weatherModel {
    constructor(key) {
        this.key = key;
        this.city = "Kiev";
        this.temp = null;
        this.icon = null;
        this.cond = null;
        this.lat = null;
        this.lon = null;
    }

    getUrl(){
        return "https://api.openweathermap.org/geo/1.0/direct?q=" + this.city +"&limit=5&appid="+ this.key;
    }
    getUrl2(){
        return "https://api.openweathermap.org/data/2.5/weather?lat="+ this.lat +"&lon="+ this.lon +"&lang=ua&appid=8b8256c5c05f81ebeada2d8c1a94e713"
    }

}

export default weatherModel;