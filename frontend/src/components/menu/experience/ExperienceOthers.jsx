import React from 'react';
import styled from 'styled-components';

const ExperienceOthers = ({ section, data }) => {
  return (
    <ExperienceOthersStyle className={`${section}-list`}>
      {data.map((element, index) => (
        <li key={index} className={`${section}`}>
          <div className="period">{element.period}</div>
          <div className="detail">
            <h5 className={`${section}-title`}>{element.title}</h5>
            <p className={`${section}-desc`}>{element.desc}</p>
          </div>
        </li>
      ))}
    </ExperienceOthersStyle>
  );
};

export default ExperienceOthers;

// ul 스타일 정의
const ExperienceOthersStyle = styled.ul`
	>li{
		display: flex;
		margin-bottom: 2rem;
		gap: 2rem;

		.period{
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			margin-top: 4px;
		}
		.detail{
			h5[class*="title"]{
			font-size: 1.25rem;
			font-weight: 600;
			margin-bottom: 12px;
		}
	
		p[class*="desc"]{
			font-size: 1rem;
			font-weight: 300;
			margin-bottom: 12px;
			line-height: 1.25;
		}
	}	
`;