/*массив карточек для первоначальной загрузки на страницу*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    //alt: ''
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    //alt: 'озеро в горах Челябинской области, зима'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
   // alt: 'панельные многоэтажки города Иваново в сумерках'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
   // alt: 'вершина вулкана Камчатки'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
   // alt: 'дорога в лесах Холмогорского района'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
   // alt: 'вид на скалу озера Байкал'
  }
];

/*загрузка карточек на страницу template*/
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elementTemplate').content;

function render() {
  for (let i = initialCards.length-1; i >= 0 ; i--) {
    renderCard(initialCards[i].name, initialCards[i].link) 
  }
}

function renderCard(name, link) {
  const newHtmlCard = cardTemplate.cloneNode(true);
  const cardTitleText = newHtmlCard.querySelector('.element__text');
  newHtmlCard.querySelector('.element__image').src = link;
  cardTitleText.textContent = name;
  newHtmlCard.querySelector('.element__image').alt = name;
  cardsSection.prepend(newHtmlCard);
  setListenersForCard(newHtmlCard, name, link); //передаем карточку для работы с ней (лайк, удаления, открытие)
}
render();

/*открытие попапа при клике на кнопку для добавления карточки*/
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__add-card');

function showPopup(popup) { ////универсальная фунция открытия передаваемого попапа
  popup.classList.add('popup_opened');
}
popupAddCardOpenButton.addEventListener('click', () => showPopup(popupAddCard));

/*закрытие попапа для добавления карточки при клике на кнопку*/
const popupAddCloseButton = document.querySelector('.popup__close_add-card');

function closePopup(popup) { //универсальная фунция закрытия передаваемого попапа
  popup.classList.remove('popup_opened');
}
popupAddCloseButton.addEventListener('click', () => closePopup(popupAddCard));

/*кнопка добавления новой карточки*/
const popupAddCardForm = document.querySelector('.popup__form-add')
const createCardButton = document.querySelector('.popup__button-create');
const cardNameInput = document.getElementById('popup__name-card');
const cardLinkInput = document.getElementById('popup__link-card');

function submitCard(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value);
  closePopup(popupAddCard);
}
popupAddCardForm.addEventListener('submit', submitCard);

/*лайк, удаление и открытие карточки*/
function setListenersForCard(card, name, link) { //слушатели на карточку для трех функциональностей
  const likeCardBotton = document.querySelector('.element__button-like');
  likeCardBotton.addEventListener('click', likeCard);

  const deleteCardBotton = document.querySelector('.element__button-delete');
  deleteCardBotton.addEventListener('click', deleteCard);

  const openCardClick = document.querySelector('.element__image');
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
function showImagePopup(popup, imageTitle, imageSrc) {
  showPopup(popup);
  /*переменные для нужной(определенной) карточки*/
  const popupImage = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__image-title');
  popupImage.src = imageSrc;
  popupImageTitle.textContent = imageTitle;
}

/*функция, которая реагирует на клик по картинке чтобы открыть попап с определенной картинкой*/
const popupOpenImage = document.querySelector('.popup__open-image');
function openCard(event) {
  const currentCard = event.target.closest('.element');
  const currentCardImageSrc = currentCard.querySelector('.element__image').src ;
  const currentCardImageTitle = currentCard.querySelector('.element__text').textContent;
  showImagePopup(popupOpenImage, currentCardImageTitle, currentCardImageSrc)
}

/*кнопка закрытия попапа c карточкой*/
const popupCardCloseButton = document.querySelector('.popup__close_open-card');
popupCardCloseButton.addEventListener('click', () => closePopup(popupOpenImage));

/*открытие попапа при клике на кнопку редактирования профиля*/
const popupOpenButton = document.querySelector('.profile-info__edit-button');
const editPopup = document.querySelector('.popup__edit');
const popupUserName = document.getElementById('popup__name');
const popupUserJob = document.getElementById('popup__job');

const userName = document.querySelector('.profile-info__name');
const userJob = document.querySelector('.profile-info__job');

function showEditPopup(popup) {
  showPopup(popup);
  popupUserName.value = userName.textContent;
  popupUserJob.value = userJob.textContent;
}
popupOpenButton.addEventListener('click',() => showEditPopup(editPopup));

/*кнопка закрытия попапа редактирования*/
const popupEditCloseButton = document.querySelector('.popup__close_edit');
popupEditCloseButton.addEventListener('click', () => closePopup(editPopup));

/*кнопка сохранить значения попапа*/
const popupForm = document.querySelector('.popup__form');
function savePopup (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userJob.textContent = popupUserJob.value;
  closePopup(editPopup);
}
popupForm.addEventListener('submit', savePopup);



