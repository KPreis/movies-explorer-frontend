import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import searchIconWhite from '../../images/search-icon-white.svg';
import searchIconColor from '../../images/search-icon-color.svg';

function SearchForm({ handleSearch, queryString, checkboxStatus }) {
  
  const moviesPathname = window.location.pathname === '/movies';

  const [query, setQuery] = useState(moviesPathname && queryString ? queryString : '');
  const [statusCheckbox, setStatusCheckbox] = useState(checkboxStatus === 'true' || false);

  const handleQueryChange = (evt) => {
    const input = document.getElementById('queryInput');
    input.setCustomValidity('');
    setQuery(evt.target.value);
    if (moviesPathname) {
      localStorage.setItem('queryString', evt.target.value);
    }
  }

  const handleCheckboxChange = (statusCheckbox) => {
    setStatusCheckbox(statusCheckbox);
    handleSearch(query, statusCheckbox);
    if (moviesPathname) {
      localStorage.setItem('checkboxStatus', statusCheckbox);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(query, statusCheckbox);
  }

  useEffect(() => {
    if (!query) {
      const input = document.getElementById('queryInput');
      input.setCustomValidity('Нужно ввести ключевое слово');
    }
  }, [query]);

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__input-wrap">
        <button
            className="search-form__submit"
            type="submit"
          >
            <img src={searchIconWhite} alt="Search Icon" />
          </button>
          <input
            id="queryInput"
            className="search-form__input"
            type="text"
            name="query"
            placeholder="Фильм"
            value={query || ''}
            onChange={handleQueryChange}
          />
          <button
            className="search-form__submit"
            type="submit"
          >
            <img src={searchIconColor} alt="Search Icon"/>
          </button>
        </div>
        <div className="search-form__filter">
          <CheckboxFilter
            statusCheckbox={statusCheckbox}
            onChange={handleCheckboxChange}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;