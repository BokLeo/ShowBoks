import React from 'react';

const ExperienceLayout = ({ section, data }) => {
  return (
    <ul className={`${section}-list`}>
      {data.map((element, index) => (
        <li key={index} className={`${section}`}>
          <div className="period">{element.period}</div>
          <div className="detail">
            <h5 className={`${section}-title`}>{element.title}</h5>
            <p className={`${section}-desc`}>{element.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExperienceLayout;