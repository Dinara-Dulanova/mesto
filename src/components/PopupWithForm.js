import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitFormFunction) {
    super(selector);
    this._submitFormFunction = submitFormFunction;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
   // evt.target.reset();
    this._form.reset();
  }
}