import React from 'react';
import './Register.css';
import image from '../../images/web-earth-img.svg'

function Register() {

  return (
    <section className="register">
      <div className="register__content">
        <div className="register__text-content">
          <h1 className="register__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="register__help-text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="register__more-info-button">
            Узнать больше
          </button>
        </div>
        <img className="register__image" src={image} alt="..." />
      </div>
      
    </section>
  );
}

export default Register;