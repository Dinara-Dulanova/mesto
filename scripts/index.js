import {Card} from './Card.js';
import {initialCards} from './CardArray.js';
import {FormValidation} from './FormValidation.js';

/*загрузка карточек на страницу template*/
const cardsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elementTemplate');

/*создаем массив карточек по шаблону*/
const cardArray = initialCards.map(function createCardArray(item) {
  const card = new Card(item.name, item.link, '.elementTemplate', showImagePopup);
  return card.createCard();
});
  
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
const cardNameInput = document.getElementById('popup__name-card');
const cardLinkInput = document.getElementById('popup__link-card');

function submitCard(evt) {
  evt.preventDefault();
  const newCard = new Card(cardNameInput.value, cardLinkInput.value, '.elementTemplate', showImagePopup);
  cardsSection.prepend(newCard.createCard());
  closePopup(popupAddCard);
  evt.target.reset();
}
popupAddCardForm.addEventListener('submit', submitCard);

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

/*валидация форм*/
const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

//const formsList = document.querySelectorAll(config.formSelector);
const formEdit = new FormValidation(configForm, popupEditForm);
formEdit.enableValidation();

const formAdd = new FormValidation(configForm, popupAddCardForm);
formAdd.enableValidation();

