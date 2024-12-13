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

    createBlock(city, iconName, takeData){
        let div = document.createElement('div');
        div.id = "weather-wrapper";
        setTimeout(() => {
            div.classList.add('show');
        }, 100);

        let cityName = document.createElement('div');
        cityName.id = "city-name";

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
        takeData();
    }

    clear(){
        const cityBlock = document.querySelector('#weather-wrapper');
        document.body.className = '';
        if (cityBlock) {
            cityBlock.remove();
            cityBlock.classList.add('show');
        }
    }
}

export default weatherView;