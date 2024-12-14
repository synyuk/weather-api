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

    createView(){
        let div = document.createElement('div');
        div.id = "weather-wrapper";
        setTimeout(() => {
            div.classList.add('show');
        }, 100);

        let cityName = document.createElement('div');
        cityName.id = "city-name";

        let temperature = document.createElement('div');
        temperature.id = "temperature";
        temperature.innerText = this.model.temp;

        let condition = document.createElement('div');
        condition.id = "condition";
        condition.innerText = this.model.cond;

        let pic = document.createElement('img');
        pic.id = "weather-pic";
        pic.src = `img/condition-bg/icons/${this.model.icon}.png`;

        document.body.classList.add(this.model.cond);
        document.body.style.backgroundImage = `url('img/condition-bg/${this.model.cond}.webp')`;
        document.body.style.backgroundSize = "cover";

        div.innerText = this.model.city;
        document.body.querySelector('.city-input').after(div);
        div.append(temperature, condition, pic);
    }

    createViewError(){
        let div = document.createElement('div');
        div.id = "weather-wrapper";
        setTimeout(() => {
            div.classList.add('show');
        }, 100);
        div.innerHTML = '<span class="error"> Такого міста не існує,<br> спробуйте ще раз</span>';
        document.body.querySelector('.city-input').after(div);
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