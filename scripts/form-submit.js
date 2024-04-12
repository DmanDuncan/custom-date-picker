export default class FormSubmitHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }
}
