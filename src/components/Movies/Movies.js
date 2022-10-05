import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/filters';

function Movies({ movies, handleMovieSave, handleMovieDelete, savedMoviesByUser }) {
  const [firstResultsNumber, setFirstResultsNumber] = useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const currentClientWidth = document.documentElement.clientWidth;

  const handleSearch = (query, checkboxStatus) => {
    setQuery(query);
    setCheckboxStatus(checkboxStatus);
  }

  useEffect(() => {
    if (movies.length > 0) {
      const searchResults = filterMovies(movies, query, checkboxStatus);
      setFilteredMovies(searchResults);
    }
  }, [movies, query, checkboxStatus]);

  useEffect(() => {
    if (currentClientWidth <= 767) {
      setFirstResultsNumber(5);
      setMoreResultsNumber(2);
    } else if (currentClientWidth <= 1275) {
      setFirstResultsNumber(8);
      setMoreResultsNumber(2);
    } else if (currentClientWidth > 1275) {
      setFirstResultsNumber(12);
      setMoreResultsNumber(3);
    }
  }, [currentClientWidth]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResultsNumber) {
        setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
        setIsMoreButtonVisible(true);
      } else {
        setMoviesToRender(filteredMovies);
      }
    }
  }, [filteredMovies, firstResultsNumber]);

  useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);

  const handleMoreButtonClick = () => {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + moreResultsNumber));
  }

  return (
    <section className="movies">
      <SearchForm handleSearch={handleSearch} />
      {moviesToRender.length > 0
        ? <MoviesCardList
          movies={moviesToRender}
          savedMoviesByUser={savedMoviesByUser}
          handleMovieSave={handleMovieSave}
          handleMovieDelete={handleMovieDelete}
          isMoreButtonVisible={isMoreButtonVisible}
          handleMoreButtonClick={handleMoreButtonClick}
        />
        : (
          <span className="movies__not-found">
            Фильмы не найдены
          </span>
        )}
    </section>
  );
}

export default Movies;