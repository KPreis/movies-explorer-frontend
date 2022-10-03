class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  sendNewCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${card['name']}`,
        link: `${card['link']}`,
      }),
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  setProfile(profile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${profile['name']}`,
        about: `${profile['about']}`,
      }),
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  changeSaveCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/movies/`, {
        method: 'POST',
        headers: this._headers,
        credentials: 'include' 
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include' 
      }).then(this._checkResponse);
    }
  }
}

export const mainApi = new MainApi({
  baseUrl: `https://api.movies.kpreis.nomoredomains.sbs`,
  headers: {
    'Content-Type': 'application/json',
  },
});
