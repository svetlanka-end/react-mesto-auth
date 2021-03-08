class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
    this.authorization = headers.authorization;
  }

  getProfileValues() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(opt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: opt.name,
        about: opt.about,
      }),
    }).then(this._checkResponse);
  }

  setNewCard(opt) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: opt.name,
        link: opt.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this.authorization,
      },
    }).then(this._checkResponse);
  }

  submitNewAvatar(opt) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: opt.avatar,
      }),
    }).then(this._checkResponse);
  }

  getArrCard() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "a29b2060-5a9c-4cf9-ba7c-9a2b349e7a4f",
    "Content-Type": "application/json",
  },
});

export default api;
