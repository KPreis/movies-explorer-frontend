import React from 'react';
import './Promo.css';
import image from '../../images/web-earth-img.svg'

function Promo() {

  return (
    <div className="promo">
      <div className="promo__content">
        <div className="promo__text-content">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__help-text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__more-info-button">
            Узнать больше
          </button>
        </div>
        <img className="promo__image" src={image} alt="..." />
      </div>
      
    </div>
  );
}

export default Promo;