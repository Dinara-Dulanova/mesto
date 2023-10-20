import { Api } from "../components/Api";
import {initialCards, configForm, popupAddCardOpenButton, popupAddCardForm, editPopupOpenButton, popupUserName, popupUserJob, popupEditForm} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import './index.css';

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-77',
  {
    authorization: '1802a89d-238f-46c2-bfc7-ea5c9242d5d5',
    'Content-Type': 'application/json'
  }
);

//функция создания экземпляра карточки
function createCard(name, link) {
  const card = new Card(name, link, '.elementTemplate', (cardName, cardLink) => {
    imagePopup.open(cardName, cardLink);
  });
  return card.createCard();
}

//class Section для добавления карточек на страницу
const cardsList = new Section({
  renderer: (data) => {
    const newCard = createCard(data.name, data.link);
    cardsList.addItem(newCard);
    },
  },
  '.elements'
);

//получение карточек с сервера и отрисовка на странице
api.getInitialCards()    //получение карточек с сервера
  .then((cards) => {
    //console.log('cards = ', cards);
    cardsList.renderItems(cards);     //отрисовка на странице
  })
  .catch((error) => {
    console.log('Ошибка запроса списка карточек', error);
  });


//начальная установка данных пользователя
const userInfo = new UserInfo({nameSelector:'.profile-info__name', aboutSelector: '.profile-info__job', avatarSelector: '.profile-info__avatar'});
api.getUserInfo()
  .then( (user) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar)
  })
  .catch((error) => {
    console.log('Ошибка запроса данных пользователя', error);
  });

//добавление карточки 
//валидация формы создания новой карточки
const formAddValidator = new FormValidator(configForm, popupAddCardForm);
formAddValidator.enableValidation();

//добавление карточки
const cardAddPopup = new PopupWithForm('.popup-add', (item) => {
  api.addCard({name:item.cardName, link: item.cardUrl})
    .then((card) => {
      cardsList.addItem(card);
    })
    .catch((error) => {
      console.log('Ошибка при добавлении карточки', error);
    });
});
cardAddPopup.setEventListeners();
popupAddCardOpenButton.addEventListener('click',() => cardAddPopup.open()); //открытие попапа с карточкой

//Редактирование профиля
//console.log(api.userInfoEdit());

/*
api.addCard({name:'lol', link: 'https://karatu.ru/wp-content/uploads/2019/07/45678-1.jpg'})
.then((newItem) => {
  const newCard = createCard(newItem);
  cardsList.addItem(newItem);
})
.catch((error) => {
  console.log('Ошибка при добавлении карточки', error);
}); /*


const cardAddPopup = new PopupWithForm('.popup-add', (item) => {
  const newCard = createCard(item.cardName, item.cardUrl);
  cardsList.addItem(newCard);
});
cardAddPopup.setEventListeners();
popupAddCardOpenButton.addEventListener('click',() => cardAddPopup.open()); //открытие попапа с карточкой
/*
import {initialCards, configForm, popupAddCardOpenButton, popupAddCardForm, editPopupOpenButton, popupUserName, popupUserJob, popupEditForm} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import './index.css';

const imagePopup = new PopupWithImage('.popup-image'); //функция для открытия попапа с картинкой этой карточки
imagePopup.setEventListeners();

//функция создания экземпляра карточки
function createCard(name, link) {
  const card = new Card(name, link, '.elementTemplate', (cardName, cardLink) => {
    imagePopup.open(cardName, cardLink);
  });
  return card.createCard();
}

//валидация форм
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
  fillPopupUserInputs(); //функция, которая заполняет попап данными пользователя с помошью метода класса UserInfo
});

//функция для получения и заполнения полей имени и рода деятельности юзера, чтобы заполнить при открытии попапа редактирования проф

function fillPopupUserInputs () {
  const userNameAndAbout = user.getUserInfo();
  popupUserName.value = userNameAndAbout.name.textContent;
  popupUserJob.value = userNameAndAbout.about.textContent;
} */