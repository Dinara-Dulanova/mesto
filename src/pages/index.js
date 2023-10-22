import { Api } from "../components/Api";
import {initialCards, configForm, popupAddCardOpenButton, popupAddCardForm, editPopupOpenButton, popupUserName, popupUserJob, popupEditForm, editAvatarPopupOpenButton, popupEditAvatarForm} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupConfirm} from "../components/PopupConfirm.js";
import {UserInfo} from '../components/UserInfo.js';

import './index.css';

const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-77',
  {
    authorization: '1802a89d-238f-46c2-bfc7-ea5c9242d5d5',
    'Content-Type': 'application/json'
  }
);

//попап подверждения удаления карточки
const cardDeletePopup = new PopupConfirm('.popup-confirmDelete', (cardId, card)=> {
  api.deleteCard(cardId)
    .then(() => 
      {
        card.removeCard();
        cardDeletePopup.close();
      })
    .catch((error) => {
      console.log('Ошибка запроса удаления карточки', error);
    });
});

const imagePopup = new PopupWithImage('.popup-image'); //функция для открытия попапа с картинкой этой карточки
imagePopup.setEventListeners();

//функция создания экземпляра карточки
function createCard(item) {
  const card = new Card( { name: item.name,
    link: item.link,
    likesArray: item.likes,
    cardId: item._id,
    cardOwnerId: item.owner._id,
  }, myId, '.elementTemplate', 
  (cardName, cardLink) => { //колбэк функция открытия попапа с карточкой
    imagePopup.open(cardName, cardLink);
  }, 
  () => {  //колбэк функция открытия попапа удаления карточки (которую передаем в Card)
    cardDeletePopup.open(item._id, card);
    cardDeletePopup.setEventListeners();
  },
  () => { //колбэк функция обработки лайков
    if (card.isLiked()) {
      api.deleteLike(item._id)
      .then (() => {
        card.renderLikes();
        console.log('delete');
      })
      .catch((error) => {
        console.log('Ошибка запроса удаления лайка с карточки', error);
      }); 
    } else {
      api.putLike(item._id)
      .then (() => {
        console.log('put');
      })
      .then (() => {
        card.renderLikes();
      })
      .catch((error) => {
        console.log('Ошибка запроса добавления лайка на карточку', error);
      });
    }
  });
  return card.createCard();
}

//class Section для добавления карточек на страницу
const cardsList = new Section({
  renderer: (data) => {
    const newCard = createCard(data);
    cardsList.addItem(newCard);
    },
  },
  '.elements'
);

//добавление карточки 
//валидация формы создания новой карточки
const formAddValidator = new FormValidator(configForm, popupAddCardForm);
formAddValidator.enableValidation();

//добавление карточки
const cardAddPopup = new PopupWithForm('.popup-add', (item) => {
  cardAddPopup.renderLoading('Сохранение...');
  api.addCard({name:item.cardName, link: item.cardUrl})
    .then((card) => {
      cardsList.addItem(card);
    })
    .catch((error) => {
      console.log('Ошибка при добавлении карточки', error);
    })
    .finally(() => {
      cardAddPopup.renderLoading('Создать');
    });
});
cardAddPopup.setEventListeners();
popupAddCardOpenButton.addEventListener('click',() => cardAddPopup.open()); //открытие попапа с карточкой

//Редактирование профиля
//валидация формы редактирования профиля
const formEditValidator = new FormValidator(configForm, popupEditForm);
formEditValidator.enableValidation();

//попап для редактирования имени и эбаут пользователя
const userInfo = new UserInfo({nameSelector:'.profile-info__name', aboutSelector: '.profile-info__job', avatarSelector: '.profile-info__avatar'});

const profileEditPopup = new PopupWithForm('.popup-edit', (item) => {
  cardAddPopup.renderLoading('Сохранение...');
  //console.log(item);
  api.userInfoEdit({name: item.name, about: item.about})
    .then((newUserInfo) => {
      //console.log(newUserInfo);
      userInfo.setUserInfo(newUserInfo.name, newUserInfo.about);
      //user.setUserAvatar(newUserInfo.avatar);
    })
    .catch((error) => {
      console.log('Ошибка при редактировании карточки', error);
    })
    .finally(() => {
      cardAddPopup.renderLoading('Создать');
    });
  
});
profileEditPopup.setEventListeners();
editPopupOpenButton.addEventListener('click',() => {
  profileEditPopup.open();
  fillPopupUserInputs(); //функция, которая заполняет попап данными пользователя с помошью метода класса UserInfo
});

//функция для получения и заполнения полей имени и рода деятельности юзера, чтобы заполнить при открытии попапа редактирования проф
function fillPopupUserInputs () {
  const userNameAndAbout = userInfo.getUserInfo();
  popupUserName.value = userNameAndAbout.name.textContent;
  popupUserJob.value = userNameAndAbout.about.textContent;
}

const avatarEditPopup = new PopupWithForm('.popup-avatar', (data) => {
  avatarEditPopup.renderLoading('Сохранение');
  api.changeAvatar(data.avatar)
    .then((res) => {
      console.log(res.avatar);
      userInfo.setUserAvatar(res.avatar);
      avatarEditPopup.close();
    })
    .catch((error) => {
      console.log('Ошибка при изменении аватара', error);
    })
    .finally(() => {
      avatarEditPopup.renderLoading('Сохранить');
    });

})
avatarEditPopup.setEventListeners();
editAvatarPopupOpenButton.addEventListener('click',() => {
  avatarEditPopup.open();
});

//валидация формы редактирования профиля;
const formEditAvatarValidator = new FormValidator(configForm, popupEditAvatarForm);
formEditAvatarValidator.enableValidation();


let myId;  //переменная для хранения id пользователя (для удаления чужих корзин)
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    myId = userData._id;
    userInfo.setUserAvatar(userData.avatar);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка первичной загрузки пользователя и карточек: ${err}`));