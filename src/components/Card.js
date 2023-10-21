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
      //console.log(this._trashElement);
    }

    //отображение лайка и закрашивание кнопки
    this.renderLikes();
    
    this._setListenersForCard();
    
    return this._newHtmlCard;
  }
  
  _setListenersForCard() {
    //лайк на карточку
    const likeCardBotton = this._cardLikeButton;
    likeCardBotton.addEventListener('click',()=> this._likeCard());

    //console.log(this._trashElement);
    //удаление карточки
    //const deleteCardBotton = this._newHtmlCard.querySelector('.element__button-delete');
    this._trashElement.addEventListener('click',()=> this._cardDeleteConfirm());

    //открытие карточки
    const openCardClick = this._cardImage;
    openCardClick.addEventListener('click', ()=> this._handleCardClick(this._name, this._link));
}
  //проверка лайкнута карточка или нет
  

  renderLikes() {
    //console.log('render');
    
    this._cardLikesCountElement = this._newHtmlCard.querySelector('.element__count-like');
    this._cardLikesCountElement.textContent = this._likesArray.length;
    if (this._likesArray.some(like => like._id === this._ownerId)) {
      this._cardLikeButton.classList.add('element__button-like_active');
      this._isLiked = true;
    } else {
      this._cardLikeButton.classList.remove('element__button-like_active');
      this._isLiked = false;
    }
    /*
    this._cardLikesCountElement = this._newHtmlCard.querySelector('.element__count-like');
    this._cardLikesCountElement.textContent = this._likesArray.length;

    if (this._likesArray.some(like => like._id === this._ownerId)) {
      this._cardLikeButton.classList.add('element__button-like_active');
    } else {
      this._cardLikeButton.classList.remove('element__button-like_active');
    } */
  }

  /*
  isLiked() {
    const isLikedByUser = this._likesArray.some((like) => {
      console.log(this._ownerId);
      return like._id === this._ownerId;
    });

    if (isLikedByUser) {
      this._isLiked = true;
      return true;
    } else {
      this._isLiked = false;
      return false;
    }
  }  /*
  /*лайк на карточку*/

  isLiked() {
    return this._isLiked;
  }
  
  _likeCard() {
    this._handleLikeClick();
    /*
    const isLiked = this.isLiked();
    
    const method = isLiked ? 'DELETE' : 'PUT';
    const apiMethod = isLiked ? this._api.deleteLike : this._api.putLike;
  
    apiMethod(this._cardId)
      .then((res) => {
        this._likesArray = res.likes;
        this._updateLikes();
      })
      .catch((err) => {
        console.log(err);
      }); */
  }
  
  /*
  _likeCard() {
    this._handleLikeClick()
    const likeButtonForCurrentCard = this._cardLikeButton;
    likeButtonForCurrentCard.classList.add('element__button-like_active');
  } /*
    
  /*удаление карточки*/
  removeCard() {
    this._newHtmlCard.remove();
  }
}