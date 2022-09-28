import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <div className="saved-movies-card-list">
        <ul className="saved-movies-card-list__list">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </div>
    </section>
  );
}

export default SavedMovies;