export default class DatePickerModalHandler {
  constructor(
    dateInput,
    modal,
    modalOverlay,
    modalOpenButton,
    modalCloseButton,
    monthSelect,
    yearInput,
    dateContainer,
    selectDateButton
  ) {
    this.dateInput = document.querySelector(dateInput);
    this.modal = document.querySelector(modal);
    this.modalOverlay = document.querySelector(modalOverlay);
    this.modalOpenButton = document.querySelector(modalOpenButton);
    this.modalCloseButton = document.querySelector(modalCloseButton);
    this.monthSelect = document.querySelector(monthSelect);
    this.yearInput = document.querySelector(yearInput);
    this.dateContainer = document.querySelector(dateContainer);
    this.selectDateButton = document.querySelector(selectDateButton);
    this.selectedDate = new Date();
    this.year = this.selectedDate.getFullYear();
    this.month = this.selectedDate.getMonth();
    this.init();
  }

  init() {
    if (this.modal) {
      this.modalOpenButton.addEventListener("click", this.openModal.bind(this));
      this.modalCloseButton.addEventListener(
        "click",
        this.closeModal.bind(this)
      );
      this.monthSelect.addEventListener("change", this.updateMonth.bind(this));
      this.yearInput.addEventListener("change", this.updateYear.bind(this));
      this.yearInput.addEventListener(
        "keydown",
        this.restrictYearLength.bind(this)
      );
      this.selectDateButton.addEventListener(
        "click",
        this.applySelectedDate.bind(this)
      );
    }
    this.populateDates();
  }

  // close calendar modal when not clicking within modal or open button
  windowCloseModal(event) {
    if (
      !event.target.closest(".date-picker-modal") &&
      !event.target.closest(".modal-open-button")
    ) {
      this.closeModal();
    }
  }

  // open date pick modal
  openModal() {
    this.modal.classList.remove("modal-closed");
    this.modal.classList.add("modal-open");
    this.modalOverlay.classList.remove("modal-closed");
    this.modalOverlay.classList.add("modal-open");
    window.addEventListener("click", this.windowCloseModal.bind(this));
  }

  // close date pick modal
  closeModal() {
    this.modal.classList.remove("modal-open");
    this.modal.classList.add("modal-closed");
    this.modalOverlay.classList.add("modal-closed");
    this.modalOverlay.classList.remove("modal-open");
    window.removeEventListener("click", this.windowCloseModal.bind(this));
  }

  // month and year inputs by default
  setYearAndMonth() {
    this.monthSelect.selectedIndex = this.month;
    this.yearInput.value = this.year;
  }

  // create button to hold date
  createButton(label, isDisabled = false, type = 0) {
    const currentDate = new Date();

    let compareDate = new Date(this.year, this.month + type, label);

    const checkCurrentDay =
      currentDate.getDate() === label &&
      parseInt(currentDate.getFullYear()) === parseInt(this.year) &&
      currentDate.getMonth() === this.month;
    const selected = this.selectedDate.getTime() === compareDate.getTime();

    const button = document.createElement("button");
    button.textContent = label;
    button.disabled = isDisabled;
    button.classList.toggle("today", checkCurrentDay);
    button.classList.toggle("selected", selected);
    return button;
  }

  // handle month select
  updateMonth() {
    this.month = this.monthSelect.selectedIndex;
    this.populateDates();
  }

  // handle year input
  updateYear() {
    this.year = this.yearInput.value;
    this.populateDates();
  }

  // restrict year input length
  restrictYearLength() {
    if (this.yearInput.value > 4) {
      this.yearInput.value = this.yearInput.value.slice(0, 3);
    }
  }

  // select date
  handleSelectDate(e) {
    const button = e.target;

    const selected = this.dateContainer.querySelector(".selected");
    selected && selected.classList.remove("selected");
    selected && selected.removeAttribute("class");

    button.classList.add("selected");

    this.selectedDate = new Date(
      this.year,
      this.month,
      parseInt(button.textContent)
    );
  }

  // apply selected date to date input
  applySelectedDate() {
    this.dateInput.value = this.selectedDate.toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    this.closeModal();
  }

  // display calendar buttons
  populateDates() {
    this.setYearAndMonth();

    this.dateContainer.innerHTML = "";

    const lastOfPrevMonth = new Date(this.year, this.month, 0);
    for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
      const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
      const button = this.createButton(text, true, -1);
      this.dateContainer.appendChild(button);
    }

    const lastOfMOnth = new Date(this.year, this.month + 1, 0);
    for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
      const button = this.createButton(i, false);
      button.addEventListener("click", this.handleSelectDate.bind(this));
      this.dateContainer.appendChild(button);
    }

    const firstOfNextMonth = new Date(this.year, this.month + 1, 1);
    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
      const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
      const button = this.createButton(text, true, 1);
      this.dateContainer.appendChild(button);
    }
  }
}
