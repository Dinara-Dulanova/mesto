export class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }
  
  _getResponse (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status} ${response.statusText}`);
    }
  }
  
  //Загрузка информации о пользователе с сервера
  getUserInfo () {
    return fetch(`${this._url}/users/me/`, {
      headers: this._headers,
      method: 'GET',
    })
    .then((response) => this._getResponse(response))
  }

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
        headers: this._headers,
        method: 'GET',
      })
      .then((response) => this._getResponse(response))
  }

  //добавление карточки
  addCard({name, link}) {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name, link})
    })
    .then((response) => this._getResponse(response))
  }

  //редактирование профиля
  userInfoEdit ({name, about}) {
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
    .then((response) => this._getResponse(response))
  }

  //удаление карточки
  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then((response) => this._getResponse(response))
  }

  //лайк на карточку
  putLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
    })
    .then((response) => this._getResponse(response))
  }

  deleteLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then((response) => this._getResponse(response))
  }

  //изменить аватар
  changeAvatar (avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarUrl})
    })
    .then((response) => this._getResponse(response));
  }
}
