import {Card} from '../components/Card.js';
import {initialCards} from '../components/CardArray.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

//функция создания экземпляра карточки
function createCard(name, link) {
  const imagePopup = new PopupWithImage('.popup-image'); //функция для открытия попапа с картинкой этой карточки
  imagePopup.setEventListeners();
  const card = new Card(name, link, '.elementTemplate', () => {
    imagePopup.open(name, link);
  });
  return card.createCard();
}

/*открытие попапа при клике на кнопку для добавления карточки*/
const popupAddCardOpenButton = document.querySelector('.profile__add-button');

/*для добавления новой карточки*/
const popupAddCardForm = document.querySelector('.popup__form-add')

/*открытие попапа при клике на кнопку редактирования профиля*/
const editPopupOpenButton = document.querySelector('.profile-info__edit-button');
const editPopup = document.querySelector('.popup-edit');
const popupUserName = document.getElementById('popup__name');
const popupUserJob = document.getElementById('popup__job');

//кнопка сохранить значения попапа
const popupEditForm = editPopup.querySelector('.popup__form-edit');

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
