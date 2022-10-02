import React from 'react';
import './AboutMe.css';
import photo from '../../images/my-photo.jpeg';

function AboutMe() {

  return (
    <div className="about-me">
      <div className="about-me__content">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me_description-container">
            <p className="about-me__name">Константин</p>
            <p className="about-me__short-description">
              Руководитель отдела тестирования, 35 лет
            </p>
            <p className="about-me__description">
              Я родился в Златоусте, живу в Москве, закончил факультет экономики МГУПИ.
              Я люблю слушать музыку.
              С 2007 года работал в компании «СтримЛабс».
              В 2014 году перешёл в компанию «Parallels». 
              В этом году компания «Parallels» ушла из России и сейчас я работаю в компании «1520 Сигнал».
            </p>
            <a href="https://github.com/KPreis" className="about-me__github-link" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </div>
          <img className="about-me__photo" src={photo} alt="Константин" />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;