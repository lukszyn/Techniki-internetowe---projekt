const current = document.querySelector("#current");
const imgs = document.querySelector(".imgs");
const img = document.querySelectorAll(".imgs img");
const menu = document.querySelector('#menu');
const opacity = 0.6;

//ustawienie przezroczystości pierwszej miniatury
img[0].style.opacity = opacity;

imgs.addEventListener("click", imgClick);

function imgClick(e) {
  // zresetowanie przezroczystości
  img.forEach((img) => (img.style.opacity = 1));

  // zmiana aktualnego obrazu na kliknięty
  current.src = e.target.src;

  // dodanie klasy z animacją
  current.classList.add("fade-in");

  // usunięcie klasy z animacją po 0.5s
  setTimeout(() => current.classList.remove("fade-in"), 500);

  // zmiana przezroczystości
  e.target.style.opacity = opacity;
}


//walidacja formularza
//dodanie obsługi zdarzenia 'submit'
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault(); //usunięcie domyślnej obsługi formularza
  let inputs = document.querySelectorAll('input');
  for (input of inputs) {
    let validated = validateInput(input); //zwalidowanie każdego pola formularza
    addInfo(input, validated); //dodanie informacji o poprawności pola
  }
});


//dodanie obsługi zdarzenia kliknięcia w pole formularza w celu wyświetlenia wskazówki
const form = document.querySelectorAll('input');

for (let input of form) {
  input.addEventListener("focus", (e) => {
    document.querySelector(`span.${e.target.id}`).style.visibility = "visible";
    document.querySelector(`span.${e.target.id}`).style.opacity = "1";
    document.querySelector(`span.${e.target.id}`).textContent = addHint(e.target.id); //wyświetlenie chmurki z treścią
  });

  input.addEventListener("blur", (e) => {
    document.querySelector(`span.${e.target.id}`).style.visibility = "hidden";
    document.querySelector(`span.${e.target.id}`).style.opacity = "0";
  });
}

function validateInput(input) {

  //walidacja pola wg konkretnego wyrażenia regularnego w zaleznosci od id inputu
  if (input.value == '') {
    return false;
  } else if (input.id == 'submit') {
    return true; //przycisk submit zwraca zawsze true
  } else {
    let patterns = {
      lastName: /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
      firstName: /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
      address: /[a-zA-Z\s]+/,
      zipCode: /(^[0-9]{2})(\-{1})([0-9]{3}$)/,
      city: /^[A-ZĘÓĄŚŁŻŹĆŃ][a-zęóąśłżźćń]+$/,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    }
    //testowanie inputu z wybranym wyrażeniem regularnym
    if (patterns[input.id].test(input.value)) return true;
    else return false;

  }
}

//dodanie informacji na stronie o tym czy pole formularza zostało poprawnie lub błędnie wypełnione
function addInfo(input, validated) {

  let selector = "span#" + input.id;

  if (validated) {
    document.querySelector(selector).innerHTML = "<i class=\"fas fa-check\"></i>";
  } else if (!validated && input.value == '') {
    document.querySelector(selector).innerHTML = "<p>Nie wprowadzono danych!</p>";
  } else {
    document.querySelector(selector).innerHTML = "<p>Wprowadzono niepoprawne dane!</p>";
  }

}


//zwraca treść chmurki w zależności od klikniętego pola
function addHint(id) {

  switch (id) {
    case ('lastName'):
      return 'np. Kowalski';
    case ('firstName'):
      return 'np. Jan';
    case ('email'):
      return 'przyklad@domena.pl';
    case ('address'):
      return 'ulica i numer domu/mieszkania';
    case ('zipCode'):
      return '"XX-XXX"';
    case ('city'):
      return 'np. Gdańsk';
  }

}

//zmienia wygląd menu głównego w zależności od wielkości ekranu
menu.addEventListener('click', () => {
  let links = document.querySelector('ul.navbar-list')
  if (links.style.display === "block") {
    links.style.display = "none";
  } else {
    links.style.display = "block";
  }

})