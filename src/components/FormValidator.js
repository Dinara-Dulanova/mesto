export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;

    this._inputsList = this._form.querySelectorAll(this._inputSelector);
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }
  
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._form.querySelector(`#${inputElement.name}-error`);
    if (isInputValid) {
      this._hideError(inputElement, errorElement); 
    } else {
      this._showError(inputElement, errorElement);
    }
  }
  
  //переключение состояния кнопки
  _toggleButtonState(isActive) {
    if (isActive) {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.disabled = 'disabled';
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }
  }
  
  //занимается установкой слушателя события
  _setEventListener() {
    this._toggleButtonState(this._form.checkValidity());
  
    [...this._inputsList].forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._toggleButtonState(this._form.checkValidity());
        this._checkInputValidity(inputElement);
      })
    })
  }

  //публичный метод, который включает валидацию формы, навешивает слушатели
  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListener();
    this._form.addEventListener('reset', () => {
      this._toggleButtonState(false);
    })
  };
}