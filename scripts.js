const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const cookies = document.querySelector('.cookies');
const cookiseBtn = document.querySelector('.cookies__button');

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