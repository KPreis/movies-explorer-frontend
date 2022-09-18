import React from 'react';
import './Techs.css';

function Techs() {

  return (
    <div className="techs">
      <div className="techs__content">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__container">
          <p className="techs__title-description">7 технологий</p>
          <p className="techs__description">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
          <ul className="techs__stack-grid-container">
            <li className="techs__stack">HTML</li>
            <li className="techs__stack">CSS</li>
            <li className="techs__stack">JS</li>
            <li className="techs__stack">React</li>
            <li className="techs__stack">Git</li>
            <li className="techs__stack">Express.js</li>
            <li className="techs__stack">mongoDB</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Techs;