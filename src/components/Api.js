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
      body: JSON.stringify({name, link})
    })
    .then((response) => onError(response))
  }

  //редактирование профиля
  userInfoEdit ({name, about}) {
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then((response) => onError(response))
  }

  //удаление карточки
  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then((response) => onError(response))
  }

  //лайк на карточку
  putLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
    })
    .then((response) => onError(response))
  }

  deleteLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then((response) => onError(response))
  }

  //изменить аватар
  changeAvatar (avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarUrl})
    })
    .then((response) => onError(response));
    }


}
