import React, { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterMovies } from '../../utils/filters';
import { moviesApi } from '../../utils/MoviesApi';
import {
  NUMBERS_MOVIES_DESKTOP,
  NUMBERS_MORE_MOVIES_DESKTOP,
  NUMBERS_MOVIES_PAD,
  NUMBERS_MORE_MOVIES_PAD,
  NUMBERS_MOVIES_MOBILE,
  NUMBERS_MORE_MOVIES_MOBILE
} from '../../utils/consts';

function Movies({ handleMovieSave, handleMovieDelete, savedMoviesByUser }) {
  const [movies, setData] = useState([]);
  const [firstResultsNumber, setFirstResultsNumber] = useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [query, setQuery] = useState(localStorage.getItem('queryString') || '');
  const [checkboxStatus, setCheckboxStatus] = useState(localStorage.getItem('checkboxStatus') || false);
  const [moviesToRender, setMoviesToRender] = useState(filteredMovies  || []);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);
  const currentClientWidth = document.documentElement.clientWidth;
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false);

  useEffect(() => {
    if (movies.length > 0) {
      const searchResults = filterMovies(movies, query, checkboxStatus);
      
      setFilteredMovies(searchResults);
      localStorage.setItem('filteredMovies', JSON.stringify(searchResults));
      setIsSearchDone(true);
    }
  }, [query, checkboxStatus]);

  useEffect(() => {
    if (currentClientWidth <= 767) {
      setFirstResultsNumber(NUMBERS_MOVIES_DESKTOP);
      setMoreResultsNumber(NUMBERS_MORE_MOVIES_DESKTOP);
    } else if (currentClientWidth <= 1275) {
      setFirstResultsNumber(NUMBERS_MOVIES_PAD);
      setMoreResultsNumber(NUMBERS_MORE_MOVIES_PAD);
    } else if (currentClientWidth > 1275) {
      setFirstResultsNumber(NUMBERS_MOVIES_MOBILE);
      setMoreResultsNumber(NUMBERS_MORE_MOVIES_MOBILE);
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
    } else {
      setMoviesToRender(filteredMovies);
    }
  }, [filteredMovies, firstResultsNumber]);

  useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);

  const handleSearch = (query, checkboxStatus) => {
    setQuery(query);
    setCheckboxStatus(checkboxStatus);

    const initialMoviesInLocalStorage = JSON.parse(localStorage.getItem('initialMovies'));

    if (!initialMoviesInLocalStorage) {
      setIsSearching(true);
      moviesApi.getMovies()
        .then((data) => {
          setData(data);
          localStorage.setItem('initialMovies', JSON.stringify(data));
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsSearching(false);
        })
    } else {
      setData(initialMoviesInLocalStorage);
    }
  }

  const handleMoreButtonClick = () => {
    setMoviesToRender((state) => filteredMovies.slice(0, state.length + moreResultsNumber));
  }

  return (
    <section className="movies">
      <SearchForm handleSearch={handleSearch} queryString={query} checkboxStatus={checkboxStatus}/>
      {filteredMovies === []
        ? isSearching
          ? <Preloader />
          : isSearchDone
            ? moviesToRender.length > 0
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
              )
            : ("")
        :moviesToRender.length > 0
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
        )
      }
    </section>
  );
}

export default Movies;