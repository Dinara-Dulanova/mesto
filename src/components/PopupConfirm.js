import { Popup } from "./Popup";

export class PopupConfirm extends Popup {
  constructor(selector, confirmFunction) {
    super(selector);
    this._confirmFunction = confirmFunction;
    this._form = this._popup.querySelector('.popup__form');
    //console.log(confirmFunction);
  }

 
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmFunction(this._cardId, this._card);
    });
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
  
}