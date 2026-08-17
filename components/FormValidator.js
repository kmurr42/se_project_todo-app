class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector,
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`,
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every(
      (inputElement) => inputElement.validity.valid,
    );

    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._inactiveButtonClass,
      !isFormValid,
    );
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    // Reset the form fields
    this._formElement.reset();
  }
}

export default FormValidator;
