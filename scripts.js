const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const cookies = document.querySelector('.cookies');
const cookiseBtn = document.querySelector('.cookies__button');
const form = document.querySelector('#form');
const datetimeField = document.getElementById('reservation');
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  const loaderElement = document.getElementById('page-loader');
  if (loaderElement) {
    loaderElement.remove();
  }
});

if (form) {
    const validator = new JustValidate(form);
    validator.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения'
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
    ]).addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения'
        },
        {
            rule: "email",
            errorMessage: "Неправильно набран email"
        }
    ]).addField('#phone', [
        {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения'
        },
        {
            rule: 'customRegexp',
            value: /^\+?[1-9]\d{10,14}$/,
            errorMessage: 'Номер телефона введен неверно (+79991112233)',
        }
    ]).addField("#reservation", [
        {
            rule: 'required',
            errorMessage: 'Поле обязательно для заполнения'
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
    ]).onSuccess(async (event) => {
        const formElement = event.target;
        const dataFromForm = new FormData(formElement);

        const formData = {
            name: dataFromForm.get('name'),
            email: dataFromForm.get('email'),
            phone: dataFromForm.get('phone'),
            datetime: dataFromForm.get('datetime'),
            comment: dataFromForm.get('comment')
        };

        if (loader) loader.style.display = 'block';

        try {
            const response = await fetch('https://rest-api-ze-agafonow.amvera.io/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка сервера');
            }

            await response.json();
            window.location.href = 'https://sok-kol.github.io/Landing_page/thanks.html';

        } catch (error) {
           console.log(error.message);
        }
    });
}

burger.addEventListener('click', function (e) {
    header.classList.toggle("header--open");
});

const cookie = localStorage.getItem("cookie");
if (!cookie) {
    setTimeout(() => {
        cookies.classList.add("cookies--active");
    }, 1000);
}

if (cookiseBtn) {
    cookiseBtn.addEventListener('click', function (e) {
        localStorage.setItem("cookie", true);
        cookies.classList.remove("cookies--active");
    });
}

if (datetimeField) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const datetimeValue = `${year}-${month}-${day}T${hours}:${minutes}`;
    datetimeField.min = datetimeValue;
    datetimeField.value = datetimeValue;
}