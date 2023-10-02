export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    //console.log(this._popup);
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
    
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    //при клике на крестик
    this._popup.querySelector('.popup__close-img').addEventListener('click', this.close.bind(this));
    
    //при клике на overlay
    this._popup.addEventListener('click', (event) =>{
      const target = event.target;
      // console.log(target);
      if (target.classList.contains('overlay')) {
        this.close();
      }
    });
  }
} 