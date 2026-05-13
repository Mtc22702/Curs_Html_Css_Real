document.addEventListener('DOMContentLoaded', function () {
  /* ==================== THEME SWITCH ==================== */
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }

  if (toggleSwitch) {
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }

    function switchTheme(e) {
      const newTheme = e.target.checked ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Inchide meniul de mobil dupa selectarea temei
      const navToggle = document.getElementById('navToggle');
      if (navToggle) {
        navToggle.checked = false;
      }
    }

    toggleSwitch.addEventListener('change', switchTheme);
  }

  /* ==================== BUTTON BACK TO TOP ==================== */
  const myButton = document.getElementById('myBtn');

  function scrollFunction() {
    if (!myButton) return;

    if (
      document.body.scrollTop > 280 ||
      document.documentElement.scrollTop > 280
    ) {
      myButton.style.display = 'block';
    } else {
      myButton.style.display = 'none';
    }
  }

  window.addEventListener('scroll', scrollFunction);

  /* ==================== FILTERS PANEL TOGGLE PE MOBIL ==================== */
  const filtreContainer = document.querySelector('.filters-panel');

  if (filtreContainer) {
    filtreContainer.addEventListener('click', function (e) {
      if (window.innerWidth <= 980) {
        if (!this.classList.contains('active')) {
          this.classList.add('active');
        } else if (e.target.closest('.filters-header')) {
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

    const today = new Date();
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

        if (isSameDate(dayDate, today)) {
          dayButton.classList.add('is-today');
        }

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
      selectedDateText.textContent = 'Alege dată , noi confirmam ora.';
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

  /* ==================== SLIDER INTERVAL PRET ==================== */
  const sliderPret = document.getElementById('pretRange');
  const pretCurent = document.getElementById('pretCurent');

  if (sliderPret && pretCurent) {
    pretCurent.textContent = sliderPret.value;

    sliderPret.addEventListener('input', function () {
      pretCurent.textContent = sliderPret.value;
    });
  }
});

/* ==================== FUNCTIE GLOBALA BACK TO TOP ==================== */
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
