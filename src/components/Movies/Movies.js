import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <Preloader /> {/* for example */}
    </section>
  );
}

export default Movies;