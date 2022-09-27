import React from 'react';
import { Route } from 'react-router-dom';
import './Footer.css';

function Footer() {

  return (
    <Route path="/(|movies|saved-movies)">
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__info">
            <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
            <ul className="footer__links">
              <li className="footer__links-item">
                <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__links-item">
                <a className="footer__link" href="https://github.com/KPreis" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Route>
  );
}

export default Footer;