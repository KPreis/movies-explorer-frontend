import React from 'react';
import './AboutProject.css';

function AboutProject() {

  return (
    <div className="about-project">
      <div className="about-project__content">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__grid-container">
          <h3 className="about-project__part-title">Дипломный проект включал 5 этапов</h3>
          <h3 className="about-project__part-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__part-description">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
          <p className="about-project__part-description">
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__timeline-grid-container">
          <div className="about-project__timeline about-project__timeline_first-week">1 неделя</div>
          <div className="about-project__timeline about-project__timeline_other-weeks">4 недели</div>
          <p className="about-project__timeline-description">Back-end</p>
          <p className="about-project__timeline-description">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;