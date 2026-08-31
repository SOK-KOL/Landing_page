const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const cookies = document.querySelector('.cookies');
const cookiseBtn = document.querySelector('.cookies__button');
const form = document.querySelector('#form');
const datetimeField = document.getElementById('reservation');
const thanksBtn = document.querySelector('.thanks__btn');
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.remove(); 
  }
});

if(form){
    const validator = new JustValidate(form);
    validator.addField('#name',[
        {
            rule:'required',
            errorMessage:'Поле обязательно для заполнения'
        },
        {
            rule: "minLength",
            value: 3,
            errorMessage: "минимум 3 символа"
        },
        {
            rule: 'customRegexp',
            value: /^[a-zа-яё\s-]+$/i, 
            errorMessage: "Не используйте спец. символы и цифры"
        }
    ]).addField('#email',[
        {
            rule:'required',
            errorMessage:'Поле обязательно для заполнения'
        },
        {
            rule:"email",
            errorMessage:"Неправильно набран email"
        }
    ]).addField('#phone',[
        {
            rule:'required',
            errorMessage:'Поле обязательно для заполнения'
        },
        {
            rule: 'customRegexp',
            value: /^\+?[1-9]\d{10,14}$/,
            errorMessage: 'Номер телефона введен неверно (+79991112233)',
        }
    ]).addField("#reservation", [
       {
            rule:'required',
            errorMessage:'Поле обязательно для заполнения'
        },
     {
        
        validator: (value) => {
          if (!value) return false;
          
          const selectedDate = new Date(value); 
          const currentDate = new Date();      
          return selectedDate > currentDate;
        },
        errorMessage: 'Неправильно выбрана дата',
      }
    ]).onSuccess((event) => {
         console.log("Валидация прошла успешно! Пытаюсь отправить форму...");
        event.target.submit(); 
    });
} 
    



burger.addEventListener('click', function (e) {
    header.classList.toggle("header--open")
});

const cookie = localStorage.getItem("cookie");
if(!cookie){
const loadCookies = () =>  {
    setTimeout(() =>{
    cookies.classList.add("cookies--active")   
    }, 1000) 
}
loadCookies();
}
if(cookiseBtn){

    cookiseBtn.addEventListener('click', function (e) {
        localStorage.setItem("cookie", true)
        cookies.classList.remove("cookies--active");
    });
}

if(datetimeField){
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const datetimeValue = `${year}-${month}-${day}T${hours}:${minutes}`;
datetimeField.min= datetimeValue;
datetimeField.value = datetimeValue;
}


document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Отменяем стандартный переход по ссылке FormSubmit

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        datetime: document.getElementById('reservation').value, // Используем id="reservation" из вашей формы
        comment: document.querySelector('.feedback-form__comment').value
    };

    // Отправляем JSON-запрос на ваш бэкенд Railway
    await fetch('https://railway.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    // После успешного запроса перенаправляем пользователя на страницу "Спасибо"
    window.location.href = 'https://sok-kol.github.io/Landing_page/thanks.html';
});

