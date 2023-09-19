export class Card {
  constructor(name, link, templateSelector, showImagePopup) {
    this._name = name;
    this._link = link;
    this._template = templateSelector;
    this._showImagePopup = showImagePopup;
  }
  
  _getTemplate() {
    return document
      .querySelector('.elementTemplate')
      .content
      .querySelector('.element')
      .cloneNode(true);
  }
  
  createCard() {
    this._newHtmlCard = this._getTemplate();
    this._newHtmlCard.querySelector('.element__image').src = this._link;
    this._newHtmlCard.querySelector('.element__text').textContent = this._name;
    this._newHtmlCard.querySelector('.element__image').alt = this._name;
    this._setListenersForCard();
   //console.log(this._newHtmlCard);
    return this._newHtmlCard;
  }
  
  _setListenersForCard() {
    //лайк на карточку
    const likeCardBotton = this._newHtmlCard.querySelector('.element__button-like');
    likeCardBotton.addEventListener('click',()=> this._likeCard());

    //удаление карточки
    const deleteCardBotton = this._newHtmlCard.querySelector('.element__button-delete');
    deleteCardBotton.addEventListener('click',()=> this._deleteCard());

    //открытие карточки
    const openCardClick = this._newHtmlCard.querySelector('.element__image');
    openCardClick.addEventListener('click', ()=> this._openCard());
}
  
  /*лайк на карточку*/
  _likeCard() {
    const likeButtonForCurrentCard = this._newHtmlCard.querySelector('.element__button-like');
    likeButtonForCurrentCard.classList.toggle('element__button-like_active');
  }
    
  /*удаление карточки*/
  _deleteCard() {
    this._newHtmlCard.remove();
  }

  _openCard() {
    const popupImage = document.querySelector('.popup-image');
    this._showImagePopup(popupImage,this._name, this._link);
  }
  
}