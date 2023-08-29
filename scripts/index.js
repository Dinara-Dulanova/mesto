/*массив карточек для первоначальной загрузки на страницу*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

/*загрузка карточек на страницу template*/
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elementTemplate').content;

/*создаем карточку по шаблону*/
function createCard(name, link) {
  const newHtmlCard = cardTemplate.cloneNode(true);
  const cardTitleText = newHtmlCard.querySelector('.element__text'); 
  newHtmlCard.querySelector('.element__image').src = link;
  cardTitleText.textContent = name;
  newHtmlCard.querySelector('.element__image').alt = name;
  setListenersForCard(newHtmlCard, name, link);
  return newHtmlCard;
}

/*создаем массив карточек по шаблону*/
const cardArray = initialCards.map(function createCardArray(item) {
  return createCard(item.name, item.link);
})

/*добавляем массив карточек на страницу*/
cardsSection.append(...cardArray);

/*открытие попапа при клике на кнопку для добавления карточки*/
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-add');
  
function showPopup(popup) { ////универсальная фунция открытия передаваемого попапа
  document.addEventListener('keydown', closePopupOnEsc);
  popup.classList.add('popup_opened');
}
popupAddCardOpenButton.addEventListener('click', () => showPopup(popupAddCard));
  
function closePopup(popup) { //универсальная фунция закрытия передаваемого попапа
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.classList.remove('popup_opened');
}

// находим все крестики и овелеи проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
const overlay = document.querySelectorAll('.overlay');

// универсальный обработчик закрытия попапов при клике на кнопку крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// универсальный обработчик закрытия попапов при клике на оверлей
overlay.forEach((overlay) => {
  const popup = overlay.closest('.popup');
  overlay.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('overlay')) {
      closePopup(popup);
    }
  });
})

// универсальный обработчик закрытия попапов при клике на Esc
function closePopupOnEsc(event) {
  if (event.keyCode === 27) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/*кнопка добавления новой карточки*/
const popupAddCardForm = document.querySelector('.popup__form-add')
const createCardButton = document.querySelector('.popup__button-create');
const cardNameInput = document.getElementById('popup__name-card');
const cardLinkInput = document.getElementById('popup__link-card');

function submitCard(evt) {
  evt.preventDefault();
  const newCard = createCard(cardNameInput.value, cardLinkInput.value);
  cardsSection.prepend(newCard);
  closePopup(popupAddCard);
 // createCardButton.setAttribute("disabled", ""); //чтобы атрибут не удалялся после добавления первой карточки
  evt.target.reset();
  toggleButtonState(createCardButton, popupAddCardForm.checkValidity(), configForm);
}
popupAddCardForm.addEventListener('submit', submitCard);

function setListenersForCard(card, name, link) {
  const likeCardBotton = card.querySelector('.element__button-like');
  likeCardBotton.addEventListener('click', likeCard);

  const deleteCardBotton = card.querySelector('.element__button-delete');
  deleteCardBotton.addEventListener('click', deleteCard);

  const openCardClick = card.querySelector('.element__image');
  openCardClick.addEventListener('click', openCard);
}

/*лайк на карточку*/
function likeCard(event) {
  const currentCard = event.target.closest('.element');
  const likeButtonForCurrentCard = currentCard.querySelector('.element__button-like');
  likeButtonForCurrentCard.classList.toggle('element__button-like_active');
}
  
/*удаление карточки*/
function deleteCard(event) {
  const currentCard = event.target.closest('.element');
  currentCard.remove();
}

/*функция, которая открывает и заполняет попап с нужной картинкой*/
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

function showImagePopup(popup, imageTitle, imageSrc) {
  showPopup(popup);
  /*переменные для нужной(определенной) карточки*/
  popupImage.src = imageSrc;
  popupImage.alt = imageTitle;
  popupImageTitle.textContent = imageTitle;
}
  
/*функция, которая реагирует на клик по картинке чтобы открыть попап с определенной картинкой*/
const popupOpenImage = document.querySelector('.popup-image');

function openCard(event) {
  const currentCard = event.target.closest('.element');
  const currentCardImageSrc = currentCard.querySelector('.element__image').src ;
  const currentCardImageTitle = currentCard.querySelector('.element__text').textContent;
  showImagePopup(popupOpenImage, currentCardImageTitle, currentCardImageSrc)
}

/*открытие попапа при клике на кнопку редактирования профиля*/
const editPopupOpenButton = document.querySelector('.profile-info__edit-button');
const editPopup = document.querySelector('.popup-edit');
const popupUserName = document.getElementById('popup__name');
const popupUserJob = document.getElementById('popup__job');
  
const userName = document.querySelector('.profile-info__name');
const userJob = document.querySelector('.profile-info__job');
  
function showEditPopup(popup) {
  popupUserName.value = userName.textContent;
  popupUserJob.value = userJob.textContent;
  showPopup(popup);
}
editPopupOpenButton.addEventListener('click',() => showEditPopup(editPopup));
  
/*кнопка сохранить значения попапа*/
const popupEditForm = editPopup.querySelector('.popup__form-edit');

function savePopup (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userJob.textContent = popupUserJob.value;
  closePopup(editPopup);
}
popupEditForm.addEventListener('submit', savePopup);