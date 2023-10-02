import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    // this._fillPopup = fillPopup;
    super(selector);
  }
    
  open(name, link) {
  //  console.log(this._popup);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__image-title');
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  } 
}