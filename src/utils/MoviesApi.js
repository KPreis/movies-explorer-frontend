import { urlBeatFilm } from './consts';
class MoviesApi {
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

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: urlBeatFilm,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});
