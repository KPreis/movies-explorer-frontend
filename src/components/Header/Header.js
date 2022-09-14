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
      <div className="header__info">
        <p className="header__email">
          {location.pathname === '/' ? emailUserInHeader : ''}
        </p>
        <Link
          className="header__link"
          to={location.pathname === '/sign-in' ? '/sign-up' : 'sign-in'}
          onClick={location.pathname === '/' ? onSignOut : () => {}}
        >
          {location.pathname === '/sign-up'
            ? 'Войти'
            : location.pathname === '/sign-in'
            ? 'Регистрация'
            : 'Выйти'}
        </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;