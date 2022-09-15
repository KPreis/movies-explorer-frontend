import logo from '../../images/logo.svg';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';

function Header({ onSignOut, emailUserInHeader }) {
  const location = useLocation(true);

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__links">
          <Link className="header__register-link">
            Регистрация
          </Link>
          <Link className="header__login-link">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;