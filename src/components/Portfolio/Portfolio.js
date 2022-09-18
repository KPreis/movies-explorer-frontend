import React from 'react';
import './Portfolio.css';

function Portfolio() {

  return (
    <div className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <p className="portfolio__item-title">Статичный сайт</p>
            <a className="portfolio__item-link" href="https://russian-travel.kpreis.ru/" target="_blank" rel="noopener noreferrer">↗</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-title">Адаптивный сайт</p>
            <a className="portfolio__item-link" href="https://mesto.kpreis.ru/" target="_blank" rel="noopener noreferrer">↗</a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-title">Одностраничное приложение</p>
            <a className="portfolio__item-link" href="https://mesto-react-auth.kpreis.ru/" target="_blank" rel="noopener noreferrer">↗</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;