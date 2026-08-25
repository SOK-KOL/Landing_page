const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const cookies = document.querySelector('.cookies');
const cookiseBtn = document.querySelector('.cookies__button');
const form = document.querySelector('#form');
const datetimeField = document.getElementById('reservation');


if (form) {
    form.action = atob(form.dataset.formEndpoint);
}

burger.addEventListener('click', function (e) {
    header.classList.toggle("header--open")
});


const loadCookies = () =>  {
    setTimeout(() =>{
    cookies.classList.add("cookies--active")   
    }, 1000) 
}

loadCookies();
cookiseBtn.addEventListener('click', function (e) {
    cookies.classList.remove("cookies--active");
});

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const datetimeValue = `${year}-${month}-${day}T${hours}:${minutes}`;

datetimeField.value = datetimeValue;