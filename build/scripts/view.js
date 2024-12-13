class weatherView{
    constructor(model){
        this.model = model;
    }

    createInput(){
        let main = document.createElement('div');
        main.id = "weather-main";
        let title = document.createElement('div');
        title.id = "weather-title"
        title.textContent = "дізнайся погоду у своєму місті";
        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Назва твого міста'
        input.classList.add('city-input');
        document.body.prepend(main);
        main.prepend(title, input);
    }

    createBlock(city, takeDescription){
        let div = document.createElement('div');
        div.id = "weather-wrapper";

        let temperature = document.createElement('div');
        temperature.id = "temperature";

        let condition = document.createElement('div');
        condition.id = "condition";

        let pic = document.createElement('img');
        pic.id = "weather-pic";
        //pic.src = "https://openweathermap.org/img/wn/10d@2x.png";

        div.innerText = city;
        document.body.querySelector('.city-input').after(div);
        div.append(temperature, condition, pic);
        let url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city +"&limit=5&appid="+ this.model.key;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                    let lat = json[0].lat;
                    let lon = json[0].lon;
                takeDescription(lat,lon);
            })
            .catch(error => div.innerHTML = '<span class="error">' + city + ' такого міста не існує, спробуйте ще раз</span>');
    }

    clear(){
        const cityBlock = document.querySelector('#weather-wrapper');
        if (cityBlock) {
            cityBlock.innerHTML = '';
        } else {
            console.warn('Элемент .city-block не найден на странице.');
        }
    }
}

export default weatherView;