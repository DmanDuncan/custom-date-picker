import FormSubmitHandler from "./scripts/form-submit.js";
import DatePickerModalHandler from "./scripts/date-picker-modal-handler.js";

const formHandler = new FormSubmitHandler("registrationForm");
const modalHandler = new DatePickerModalHandler(
  ".date-input",
  ".date-picker-modal",
  ".modal-overlay",
  ".modal-open-button",
  ".modal-close-button",
  ".month-select",
  ".year-input",
  ".date-container",
  ".modal-select-date"
);
