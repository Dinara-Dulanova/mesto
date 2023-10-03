export const initialCards = [
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

/*открытие попапа при клике на кнопку для добавления карточки*/
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');

/*для добавления новой карточки*/
export const popupAddCardForm = document.querySelector('.popup__form-add')

/*открытие попапа при клике на кнопку редактирования профиля*/
export const editPopupOpenButton = document.querySelector('.profile-info__edit-button');
export const popupUserName = document.getElementById('popup__name');
export const popupUserJob = document.getElementById('popup__job');

//кнопка сохранить значения попапа
const editPopup = document.querySelector('.popup-edit');
export const popupEditForm = editPopup.querySelector('.popup__form-edit');

export const configForm = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};