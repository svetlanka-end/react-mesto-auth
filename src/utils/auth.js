class Auth {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register = (emailUser, passwordUser) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordUser,
        email: emailUser,
      }),
    }).then(this._checkResponse);
  };

  authorize = (emailUser, passwordUser) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordUser,
        email: emailUser,
      }),
    }).then(this._checkResponse);
  };

  getContent = (token) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});

export default auth;
