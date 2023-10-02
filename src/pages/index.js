import {initialCards, popupAddCardOpenButton, popupAddCardForm, editPopupOpenButton, popupUserName, popupUserJob, popupEditForm} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import './index.css';

//функция создания экземпляра карточки
function createCard(name, link) {
  const imagePopup = new PopupWithImage('.popup-image'); //функция для открытия попапа с картинкой этой карточки
  imagePopup.setEventListeners();
  const card = new Card(name, link, '.elementTemplate', () => {
    imagePopup.open(name, link);
  });
  return card.createCard();
}

/*валидация форм*/
const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};

//валидация формы редактирования профиля
const formEditValidator = new FormValidator(configForm, popupEditForm);
formEditValidator.enableValidation();

//валидация формы создания новой карточки
const formAddValidator = new FormValidator(configForm, popupAddCardForm);
formAddValidator.enableValidation();

//class Section для добавления карточек на страницу
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item.name, item.link);
    cardsList.addItem(newCard);
    },
  },
  '.elements'
);

//отрисовка карточек на странице
cardsList.renderItems();

//попап для карточки
const cardAddPopup = new PopupWithForm('.popup-add', (item) => {
  const newCard = createCard(item.cardName, item.cardUrl);
  cardsList.addItem(newCard);
});
cardAddPopup.setEventListeners();
popupAddCardOpenButton.addEventListener('click',() => cardAddPopup.open()); //открытие попапа с карточкой

//попап для редактирования
const user = new UserInfo({nameSelector:'.profile-info__name', aboutSelector: '.profile-info__job'});

const profileEditPopup = new PopupWithForm('.popup-edit', (item) => {
  user.setUserInfo(item.name, item.about);
});
profileEditPopup.setEventListeners();
editPopupOpenButton.addEventListener('click',() => {
  profileEditPopup.open();
  getUserInfo(); //функция, которая заполняет попап данными пользователя с помошью метода класса UserInfo
});

//функция для получения и заполнения полей имени и рода деятельности юзера, чтобы заполнить при открытии попапа редактирования проф
function getUserInfo () {
  popupUserName.value = user.getUserInfo().name.textContent;
  popupUserJob.value = user.getUserInfo().about.textContent;
}