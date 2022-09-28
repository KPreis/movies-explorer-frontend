import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  const isMoreButtonVisible = true;
  const moreButtonClassName = `movies-card-list__more-button ${
    isMoreButtonVisible && "movies-card-list__more-button_visible"
  }`;

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button
        className={moreButtonClassName}
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
