import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, handleMovieSave, savedMoviesByUser }) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        movies={movies}
        handleMovieSave={handleMovieSave}
        savedMoviesByUser={savedMoviesByUser}
      />
      <Preloader /> {/* for example */}
    </section>
  );
}

export default Movies;