/*открытие попапа при клике на кнопку для добавления карточки*/
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');

/*для добавления новой карточки*/
export const popupAddCardForm = document.querySelector('.popup__form-add')

/*открытие попапа при клике на кнопку редактирования профиля*/
export const editPopupOpenButton = document.querySelector('.profile-info__edit-button');
export const popupUserName = document.getElementById('popup__name');
export const popupUserJob = document.getElementById('popup__job');

//кнопка открытия попапа редактирования аватара
//export const editAvatarPopupOpenButton = document.querySelector('.profile-info__avatar');
export const editAvatarPopupOpenButton = document.querySelector('.profile-info__avatar-container');

//кнопка сохранить значения попапа
const editPopup = document.querySelector('.popup-edit');
export const popupEditForm = editPopup.querySelector('.popup__form-edit');

export const popupEditAvatarForm = document.querySelector('.popup__form-avatar');

export const configForm = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};