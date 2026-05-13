// Aplicatia 2
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  // Închide meniul de mobil după selectarea temei
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.checked = false;
  }

  // Reîmprospătează pagina pentru a asigura aplicarea completă a temei.
  location.reload();
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Button back to Top:
let mybutton = document.getElementById('myBtn');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 280 ||
    document.documentElement.scrollTop > 280
  ) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// Script pentru funcționalitatea de toggle la filtre pe mobil
document.addEventListener('DOMContentLoaded', function () {
  const filtreContainer = document.querySelector('.filtre');

  if (filtreContainer) {
    filtreContainer.addEventListener('click', function (e) {
      // Verificăm lățimea ecranului pentru a rula doar pe mobil/tabletă
      if (window.innerWidth <= 980) {
        // Dacă meniul este închis, îl deschidem
        if (!this.classList.contains('active')) {
          this.classList.add('active');
        }
        // Dacă este deschis, îl închidem DOAR dacă s-a dat click pe header
        // (astfel evităm închiderea când userul bifează o opțiune din interior)
        else if (e.target.closest('.filtre-header')) {
          this.classList.remove('active');
        }
      }
    });
  }
});
