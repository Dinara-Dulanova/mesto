export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }
  
  createCard() {
    this._newHtmlCard = this._getTemplate();
    this._cardImage = this._newHtmlCard.querySelector('.element__image');
    this._cardLikeButton = this._newHtmlCard.querySelector('.element__button-like');
    this._cardImage.src = this._link;
    this._newHtmlCard.querySelector('.element__text').textContent = this._name;
    this._cardImage.alt = this._name;
    this._setListenersForCard();
   //console.log(this._newHtmlCard);
    return this._newHtmlCard;
  }
  
  _setListenersForCard() {
    //лайк на карточку
    const likeCardBotton = this._cardLikeButton;
    likeCardBotton.addEventListener('click',()=> this._likeCard());

    //удаление карточки
    const deleteCardBotton = this._newHtmlCard.querySelector('.element__button-delete');
    deleteCardBotton.addEventListener('click',()=> this._deleteCard());

    //открытие карточки
    const openCardClick = this._cardImage;
    openCardClick.addEventListener('click', ()=> this._handleCardClick(this._name, this._link));
}
  
  /*лайк на карточку*/
  _likeCard() {
    const likeButtonForCurrentCard = this._cardLikeButton;
    likeButtonForCurrentCard.classList.toggle('element__button-like_active');
  }
    
  /*удаление карточки*/
  _deleteCard() {
    this._newHtmlCard.remove();
  }
}