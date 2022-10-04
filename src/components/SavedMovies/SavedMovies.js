import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies({handleMovieDelete, savedMovies}) {
  return (
    <section className="saved-movies">
      <SearchForm />
      <div className="saved-movies-card-list">
        <ul className="saved-movies-card-list__list">
          {savedMovies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              handleMovieDelete={handleMovieDelete}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SavedMovies;