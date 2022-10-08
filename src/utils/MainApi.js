import {urlBeatFilm} from './consts';

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

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  saveMovie(movie) {
    const {
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
      owner
    } = movie;
    const movieId = movie.id;
    const image = `${urlBeatFilm}${movie.image.url}`;
    const thumbnail = `${urlBeatFilm}${movie.image.formats.thumbnail.url}`;

    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner
      }),
      credentials: 'include' 
    }).then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
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

  setProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email
      }),
      credentials: 'include' 
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: `https://api.movies.kpreis.nomoredomains.sbs`,
  headers: {
    'Content-Type': 'application/json',
  },
});
