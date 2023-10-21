import { Popup } from "./Popup";

export class PopupConfirm extends Popup {
  constructor(selector, confirmFunction) {
    super(selector);
    this._confirmFunction = confirmFunction;
    //this._form = this._popup.querySelector('.popup__form');
    //console.log(confirmFunction);
  }

 
  setEventListeners() {
    super.setEventListeners();
    //console.log(this._form);
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmFunction(this._cardId, this._card);
    });
    //console.log(this._cardId);
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
    

   // this._popup.addEventListener('submit', this._confirmFunction);
  
}