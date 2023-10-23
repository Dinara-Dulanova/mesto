export class Card {
  constructor({name, link, likesArray, cardId, cardOwnerId}, ownerId, templateSelector, handleCardClick, cardDeleteConfirm, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likesArray = likesArray;
    this._cardId = cardId;
    this._cardOwnerId = cardOwnerId;
    this._ownerId = ownerId;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick; //функция открытия попапа с карточкой
    this._cardDeleteConfirm = cardDeleteConfirm; //функция подверждения удаления карточки
    this._handleLikeClick = handleLikeClick;

    //this._renderLikes();
    //console.log(this._cardId);
    //console.log(this._likesArray.length);
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
   
    this._trashElement = this._newHtmlCard.querySelector('.element__button-delete');
    //удаление чужих корзин
    if (this._cardOwnerId !== this._ownerId) {
      this._trashElement.remove();
    }

    //отображение лайка и закрашивание кнопки
    this.renderLikes(this._likesArray);
    this._setListenersForCard();
    
    return this._newHtmlCard;
  }
  
  _setListenersForCard() {
    //лайк на карточку
    const likeCardBotton = this._cardLikeButton;
    likeCardBotton.addEventListener('click',()=> this._handleLikeClick());

    //удаление карточки
    //const deleteCardBotton = this._newHtmlCard.querySelector('.element__button-delete');
    this._trashElement.addEventListener('click',()=> this._cardDeleteConfirm());

    //открытие карточки
    const openCardClick = this._cardImage;
    openCardClick.addEventListener('click', ()=> this._handleCardClick(this._name, this._link));
}
  //проверка лайкнута карточка или нет
  

  renderLikes(arr) {
    this._cardLikesCountElement = this._newHtmlCard.querySelector('.element__count-like');
    this._cardLikesCountElement.textContent = arr.length;
    if (arr.some(like => like._id === this._ownerId)) {
      this._cardLikeButton.classList.add('element__button-like_active');
      this._isLiked = true;
    } else {
      this._cardLikeButton.classList.remove('element__button-like_active');
      this._isLiked = false;
    }
  }

  isLiked() {
    return this._isLiked;
  }

  /*удаление карточки*/
  removeCard() {
    this._newHtmlCard.remove();
  }
}