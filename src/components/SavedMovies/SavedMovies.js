import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {filterMovies} from '../../utils/filters';

function SavedMovies({ handleMovieDelete, savedMoviesByUser }) {
  const [query, setQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(savedMoviesByUser);

  function handleSearch(query, checkboxStatus) {
    setQuery(query);
    setCheckboxStatus(checkboxStatus);
    const movies = filterMovies(savedMoviesByUser, query, checkboxStatus);
    setFilteredMovies(movies);
  }

  useEffect(() => {
    if (filteredMovies.length > 0) {
      const searchResult = filterMovies(savedMoviesByUser, query, checkboxStatus);
      setFilteredMovies(searchResult);
    }
  }, [savedMoviesByUser]);

  console.log(filteredMovies.length);

  return (
    <section className="saved-movies">
      <SearchForm handleSearch={handleSearch} />
      {filteredMovies.length > 0
        ? <MoviesCardList
            movies={filteredMovies}
            handleMovieDelete={handleMovieDelete}
            isMoreButtonVisible={false}
          />
        : (
          <span className="saved-movies__not-found">
            Фильмы не найдены 
          </span>
        )
      }
    </section>
  );
}

export default SavedMovies;