/*открытие попапа при клике на кнопку*/
let popupOpenButton = document.querySelector('.profile-info__edit-button');
let popup = document.querySelector('.popup');
let popupUserName = document.getElementById('popup__name');
let popupUserJob = document.getElementById('popup__job');

let userName = document.querySelector('.profile-info__name');
let userJob = document.querySelector('.profile-info__job');

function showPopup() {
  popup.classList.add('popup_opened');
  popupUserName.value = userName.textContent;
  popupUserJob.value = userJob.textContent;
}
popupOpenButton.addEventListener('click', showPopup);

/*кнопка закрытия попапа*/
let popupCloseButton = document.querySelector('.popup__close');
function closePopup() {
  popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', closePopup);

/*кнопка сохранить значения попапа*/
let popupForm = document.querySelector('.popup__form');
function savePopup (evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userJob.textContent =popupUserJob.value;
  closePopup();
}
popupForm.addEventListener('submit', savePopup);



