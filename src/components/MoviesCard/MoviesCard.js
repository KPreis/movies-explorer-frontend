import React from 'react';
import './MoviesCard.css';
import { Route, Switch } from 'react-router-dom';
import { urlBeatFilm } from '../../utils/consts';
import { convertDuration } from '../../utils/converters';

function MoviesCard({
  movie,
  handleMovieDelete,
  handleMovieSave,
  savedMoviesByUser
}) {
  const isSaved = movie.id && savedMoviesByUser.some((m) => m.movieId === movie.id);
  const saveButtonClassName = `movies-card__button movies-card__button_type_save ${isSaved && "movies-card__button_type_saved"
    }`;
  const deleteButtonClassName = "movies-card__button movies-card__button_type_delete";

  const handleDeleteClick = () => {
    handleMovieDelete(movie);
  }

  const handleSaveClick = () => {
    if (isSaved) {
      handleMovieDelete(savedMoviesByUser.filter((m) => m.movieId === movie.id)[0]);
    } else if (!isSaved) {
      handleMovieSave(movie);
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__header">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{convertDuration(movie.duration)}</span>
      </div>
      <a
        className="movies-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <Switch>
          <Route path="/movies">
            <img
              className="movies-card__cover"
              src={`${urlBeatFilm}${movie.image.url}`}
              alt="Обложка фильма"
            />
          </Route>
          <Route path="/saved-movies">
            <img
              className="movies-card__cover"
              src={movie.image}
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
              onClick={handleSaveClick}
            ></button>
          </Route>
          <Route path="/saved-movies">
            <button
              className={deleteButtonClassName}
            type="button"
            onClick={handleDeleteClick}
            ></button>
          </Route>
        </Switch>
    </li>
  );
}

export default MoviesCard;
