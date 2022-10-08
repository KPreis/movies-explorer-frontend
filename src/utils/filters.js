import { DURATION_SHORT_FILM } from './consts';

export const filterMovies = (movies, query, checkboxStatus) => {
  let moviesToFilter = movies;
  let result;

  if (checkboxStatus) {
    moviesToFilter = moviesToFilter.filter((movie) => movie.duration <= DURATION_SHORT_FILM);
  }

  result = moviesToFilter.filter((movie) => {
    return movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  })
  return result;
}