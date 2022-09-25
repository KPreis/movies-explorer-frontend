import React from 'react';
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__copyright">© 2022</p>
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
  );
}

export default Footer;