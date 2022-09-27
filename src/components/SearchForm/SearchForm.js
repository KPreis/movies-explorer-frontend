import React from 'react';
import './SearchForm.css';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import searchIconWhite from '../../images/search-icon-white.svg';
import searchIconColor from '../../images/search-icon-color.svg';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
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
            required
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
            checkboxStatus={true}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;