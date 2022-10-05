import React, { useState } from 'react';
import './SearchForm.css';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import searchIconWhite from '../../images/search-icon-white.svg';
import searchIconColor from '../../images/search-icon-color.svg';

function SearchForm({ handleSearch }) {
  const [query, setQuery] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  const handleQueryChange = (evt) => {
    setQuery(evt.target.value);
  }

  const handleCheckboxChange = (statusCheckbox) => {
    setStatusCheckbox(statusCheckbox);
    handleSearch(query, statusCheckbox);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSearch(query, statusCheckbox);
  }



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