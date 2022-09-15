import logo from '../../images/logo.svg';
import React from 'react';
import './Header.css';

function Header() {

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__links">
          <button className="header__register-link">
            Регистрация
          </button>
          <button className="header__login-link">
            Войти
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;