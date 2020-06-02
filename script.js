const current = document.querySelector('#current');
const imgs = document.querySelector('.imgs');
const img = document.querySelectorAll('.imgs img');
const opacity = 0.6;

//ustawienie przezroczystości pierwszej miniatury
img[0].style.opacity = opacity;

imgs.addEventListener('click', imgClick);

function imgClick(e) {
  // zresetowanie przezroczystości
  img.forEach(img => (img.style.opacity = 1));

  // zmiana aktualnego obrazu na kliknięty
  current.src = e.target.src;

  // dodanie klasy z animacją
  current.classList.add('fade-in');

  // usunięcie klasy z animacją po 0.5s
  setTimeout(() => current.classList.remove('fade-in'), 500);

  // zmiana przezroczystości
  e.target.style.opacity = opacity;
}



//walidacja formularza
let form = document.querySelectorAll('input');
form = [...form];
const submitButton = form.pop();

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    validateForm(e.target);
    addInfo(input, validated);
});

for (let input of form) {
    input.addEventListener('focus', (e) => {
        document.querySelector(`span.${e.target.id}`).style.visibility = 'visible'
        document.querySelector(`span.${e.target.id}`).style.opacity = '1'
    });

    input.addEventListener('blur', (e) => {
        document.querySelector(`span.${e.target.id}`).style.visibility = 'hidden'
        document.querySelector(`span.${e.target.id}`).style.opacity = '0'
    });
}



function validateForm(form) {

    let inputs = form.querySelectorAll('input')
    let val = input.value;

    if (val == '') {
        return false;

    } else {

        let patterns = {
            "lastName": /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
            "firstName": /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
            "address": /[a-zA-Z\s]+/,
            "zipCode": /(^[0-9]{2})(\-{1})([0-9]{3}$)/,
            "city": /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
            "email": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        };

        // if (patterns[input.id].test(val)) return true;
        // else return false;
    }
}

function addInfo(input, validated) {

    let selector = "span." + input.id;

    if (validated) {
        document.querySelector(selector).innerHTML = "<i class=\"fas fa-check\"></i>";
    } 
    else if (!validated && input.value == '') {
        document.querySelector(selector).innerHTML = "<p>Nie wprowadzono danych!</p>";
    } else {
        document.querySelector(selector).innerHTML = "<p>Wprowadzono niepoprawne dane!</p>";
    }
    
}
