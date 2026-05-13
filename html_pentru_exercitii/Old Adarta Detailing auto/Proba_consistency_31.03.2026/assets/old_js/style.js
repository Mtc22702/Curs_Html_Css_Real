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
  /* ==================== CALENDAR PROGRAMARI ==================== */
  const monthLabel = document.getElementById('calendar-month');
  const calendarGrid = document.getElementById('calendar-grid');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const clearDateBtn = document.getElementById('clear-date');
  const confirmDateBtn = document.getElementById('confirm-date');
  const selectedDateInput = document.getElementById('selected-date');
  const selectedDateText = document.getElementById('selected-date-text');

  // ruleaza doar daca exista calendarul pe pagina
  if (
    monthLabel &&
    calendarGrid &&
    prevMonthBtn &&
    nextMonthBtn &&
    clearDateBtn &&
    confirmDateBtn &&
    selectedDateText &&
    selectedDateInput
  ) {
    const monthNames = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ];

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    function normalizeDate(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function formatDateRO(date) {
      return date.toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }

    function formatDateValue(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function isSameDate(date1, date2) {
      return (
        date1 &&
        date2 &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

    function updatePrevButtonState() {
      const isCurrentDisplayedMonth =
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      prevMonthBtn.disabled = isCurrentDisplayedMonth;
      prevMonthBtn.style.opacity = isCurrentDisplayedMonth ? '0.4' : '1';
      prevMonthBtn.style.cursor = isCurrentDisplayedMonth
        ? 'not-allowed'
        : 'pointer';
    }

    function renderCalendar(month, year) {
      calendarGrid.innerHTML = '';
      monthLabel.textContent = `${monthNames[month]} ${year}`;

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const firstWeekday = firstDayOfMonth.getDay(); // 0 = Duminica
      const daysInMonth = lastDayOfMonth.getDate();

      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const normalizedToday = normalizeDate(today);

      // Zile din luna anterioara
      for (let i = firstWeekday; i > 0; i--) {
        const dayButton = document.createElement('button');
        dayButton.type = 'button';
        dayButton.className = 'calendar-day is-muted';
        dayButton.textContent = prevMonthLastDay - i + 1;
        dayButton.disabled = true;
        calendarGrid.appendChild(dayButton);
      }

      // Zilele lunii curente
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const normalizedDayDate = normalizeDate(dayDate);

        const dayButton = document.createElement('button');
        dayButton.type = 'button';
        dayButton.className = 'calendar-day';
        dayButton.textContent = day;

        const isPastDate = normalizedDayDate < normalizedToday;

        if (isPastDate) {
          dayButton.classList.add('is-disabled');
          dayButton.disabled = true;
        } else {
          dayButton.addEventListener('click', function () {
            selectedDate = dayDate;
            selectedDateInput.value = formatDateValue(dayDate);
            selectedDateText.textContent = `Data selectata: ${formatDateRO(dayDate)}`;
            renderCalendar(currentMonth, currentYear);
          });
        }

        if (isSameDate(dayDate, selectedDate)) {
          dayButton.classList.add('is-selected');
        }

        calendarGrid.appendChild(dayButton);
      }

      // Completeaza ultimul rand din grila
      const totalCells = calendarGrid.children.length;
      const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

      for (let day = 1; day <= remainingCells; day++) {
        const dayButton = document.createElement('button');
        dayButton.type = 'button';
        dayButton.className = 'calendar-day is-muted';
        dayButton.textContent = day;
        dayButton.disabled = true;
        calendarGrid.appendChild(dayButton);
      }

      updatePrevButtonState();
    }

    prevMonthBtn.addEventListener('click', function () {
      const isCurrentDisplayedMonth =
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      if (isCurrentDisplayedMonth) return;

      currentMonth--;

      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }

      renderCalendar(currentMonth, currentYear);
    });

    nextMonthBtn.addEventListener('click', function () {
      currentMonth++;

      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }

      renderCalendar(currentMonth, currentYear);
    });

    clearDateBtn.addEventListener('click', function () {
      selectedDate = null;
      selectedDateInput.value = '';
      selectedDateText.textContent = 'Nu ai selectat inca o data.';
      renderCalendar(currentMonth, currentYear);
    });

    confirmDateBtn.addEventListener('click', function () {
      if (!selectedDate) {
        alert('Te rog selecteaza o data pentru programare.');
        return;
      }

      alert(`Ai selectat data: ${formatDateRO(selectedDate)}`);
    });

    renderCalendar(currentMonth, currentYear);
  }
});
