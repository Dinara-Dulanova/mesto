const onError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
  }
}

export class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo () {
    return fetch(`${this._url}/users/me/`, {
      headers: this._headers,
      method: 'GET',
    })
    .then((response) => onError(response))
  }

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
        headers: this._headers,
        method: 'GET',
      })
      .then((response) => onError(response))
  }

  //добавление карточки
  addCard({name, link}) {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name,link})
    })
    .then((response) => onError(response))
  }

  //редактирование профиля
  /*
  userInfoEdit () {
    fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    })
    .then((response) => onError(response))
  } */


}
