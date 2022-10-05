import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, handleMovieSave, savedMoviesByUser, handleMoreButtonClick, isMoreButtonVisible, handleMovieDelete}) {
  
  const moreButtonClassName = `movies-card-list__more-button ${
    isMoreButtonVisible && "movies-card-list__more-button_visible"
    }`;

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
      {movies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            savedMoviesByUser={savedMoviesByUser}
            handleMovieSave={handleMovieSave}
            handleMovieDelete={handleMovieDelete}
          />
        ))}
      </ul>
      <button
        className={moreButtonClassName}
        type="button"
        onClick={handleMoreButtonClick}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
