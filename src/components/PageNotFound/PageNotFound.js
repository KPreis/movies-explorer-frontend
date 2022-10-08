import React from 'react';
import './PageNotFound.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();

  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__subtitle">Страница не найдена</p>
      <button className="page-not-found__back" onClick={() => history.goBack()} type="button">Назад</button>
    </section>
  );
}

export default PageNotFound;
