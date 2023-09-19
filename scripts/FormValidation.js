export class FormValidation {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
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
  _toggleButtonState(buttonElement, isActive) {
    if (isActive) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      buttonElement.disabled = 'disabled';
      buttonElement.classList.add(this._inactiveButtonClass);
    }
  }
  
  //занимается установкой слушателя события
  _setEventListener() {
    const inputsList = this._form.querySelectorAll(this._inputSelector);
    const submitButtonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(submitButtonElement, this._form.checkValidity());
  
    [...inputsList].forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._toggleButtonState(submitButtonElement, this._form.checkValidity());
        this._checkInputValidity(inputElement);
      })
    })
  }

  //публичный метод, который включает валидацию формы, навешивает слушатели
  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListener();
    this._form.addEventListener('reset', () => {
      this._toggleButtonState(this._form.querySelector(this._submitButtonSelector), false);
    })
  };
}