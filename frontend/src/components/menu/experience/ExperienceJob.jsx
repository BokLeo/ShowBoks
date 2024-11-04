import React from "react";
import { jobs } from "../../../data/experienceData";
import styled from "styled-components";

const ExperienceJob = () => {
  const toggleHoverJobActive = (e) => {
    e.preventDefault();
    const jobList = e.target.closest(".job-list");
    const jobItems = jobList.querySelectorAll(".job");

    jobItems.forEach((item) => {
      item.classList.remove("active");
    });

    e.target.closest(".job").classList.add("active");
  };

  return (
    <JobListStyle className="job-list">
      {jobs.map((job, index) => (
        <li
          className={`job ${index === 0 ? "active" : ""}`}
          key={index}
          onMouseEnter={toggleHoverJobActive}
        >
          <div className="period">{job.period}</div>

          <div className="detail">
            <h5 className="job-title">
              {job.title}
              <span className="dashed" />
              {job.company}
            </h5>
            <p className="job-desc">{job.desc}</p>
            <div className="job-skill">
              <h6>Used Tech</h6>
              <ul className="skills">
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </JobListStyle>
  );
};

export default ExperienceJob;


// ul 스타일 정의
const JobListStyle = styled.ul`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: flex-end;
	
	>li{
		display: flex;
		flex-direction: row;
		width: 100%;
		opacity: 0.3;
		padding: 20px;
		&:not(:last-child){
			margin-bottom: 20px;
		}	

		.period{
			display: flex;
			flex-direction: column;
			align-items: center;

			width: 40%;
			font-size: 1rem;
			font-weight: 600;
			line-height: 1.5;

			&::after{
				content: '';
				display: block;
				width: 1px;
				height: 100%;
				background-color: BS.$color-typo-666;
				margin-top: 12px;
			}
		}

		.detail{
			width: 60%;
		}

		.job-title{
			font-size: 1.25rem;
			font-weight: 600;
			margin-bottom: 12px;

			&::before{
				content: '⏺️';
				display: inline-block;
				width: 16px;
				height: 16px;
				margin-right: 16px;
				margin-left: -4px;
			}
		}
		.job-desc{
			font-size: 1rem;
			font-weight: 300;
			margin-bottom: 12px;
			line-height: 1.25;
		}

		.job-skill{
			h6{
				font-size: 1rem;
				font-weight: 400;
				margin-bottom: 4px;	

				background-color: #333;
				color: #fff;
				border-radius: 4px;
				padding: 4px 8px;
				display: inline-block;
			}
			.skills{
				display: flex;
				flex-wrap: wrap;
				li{
					margin-right: 8px;
					line-height: 1.25;
					font-weight: 300;
					&:not(:last-child)::after{
						content: '|';
						margin-left: 8px;
					}
				}
			}
		}

		&.active{
			opacity: 1;
			box-shadow: 0 2px 8px rgba(0,0,0,0.1);
			transition: 0.3s all ease;
			.period, .job-title{
				color: #007bff;
			}
			.job-skill h5{
				background-color: #007bff;
			}
		}
		&:hover{
			cursor: pointer;
			opacity: 1;
			transition: 0.3s all ease;
			.period, .job-title{
				color: #007bff;
			}
			.job-skill h5{
				background-color: #007bff;
			}
		}
	}

	
`;