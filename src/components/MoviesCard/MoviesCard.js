import React from 'react';
import './MoviesCard.css';
import { Route, Switch } from 'react-router-dom';

function MoviesCard( { movie } ) {
  const isSaved = false;
  const saveButtonClassName = `movies-card__button movies-card__button_type_save ${
    isSaved && "movies-card__button_type_saved"
  }`;
  const deleteButtonClassName = "movies-card__button movies-card__button_type_delete";

  return (
    <li className="movies-card">
      <div className="movies-card__header">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{movie.duration}</span>
      </div>
      <a
        className="movies-card__link"
        href="https://www.lgxbranding.com/wp-content/uploads/2021/05/banksy-lgx-3.jpg"
        target="_blank"
        rel="noreferrer"
      >
        <Switch>
          <Route path="/movies">
            <img
              className="movies-card__cover"
              src="https://www.lgxbranding.com/wp-content/uploads/2021/05/banksy-lgx-3.jpg"
              alt="Обложка фильма"
            />
          </Route>
          <Route path="/saved-movies">
            <img
              className="movies-card__cover"
              src="https://www.lgxbranding.com/wp-content/uploads/2021/05/banksy-lgx-3.jpg"
              alt="Обложка фильма"
            />
          </Route>
        </Switch>
      </a>
      <Switch>
          <Route path="/movies">
            <button
              className={saveButtonClassName}
              type="button"
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className={deleteButtonClassName}
              type="button"
            ></button>
          </Route>
        </Switch>
    </li>
  );
}

export default MoviesCard;
