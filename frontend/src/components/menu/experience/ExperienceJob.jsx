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
						<ul className='job-desc-list'>
								{Array.isArray(job.desc) ? (
										job.desc.map((desc, index) => (
												<li key={index}>{desc}</li>
										))
								) : (
										<li>설명 데이터가 없습니다.</li>
								)}	
						</ul>            
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
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		.job-title{
			font-size: 1.25rem;
			font-weight: 600;

			&::before{
				content: '⏺️';
				display: inline-block;
				width: 16px;
				height: 16px;
				margin-right: 16px;
				margin-left: -4px;
			}
		}
		.job-desc-list{
			list-style: none;
			display: flex;
			flex-direction: column;
			line-height: 1.25;
			gap: 8px;
			li{
				&::before{
					content: '🔹';
					margin-right: 8px;
				}
			}
		}

		.job-skill{
			h6{
				font-size: 1rem;
				font-weight: 400;
				margin-bottom: 8px;
				background-color: #333;
				color: #fff;
				border-radius: 4px;
				padding: 4px 8px;
				display: inline-block;
			}

			ul{
				display: flex;
				gap: 8px;
				flex-wrap: wrap;
				li{
					font-size: 1rem;
					font-weight: 300;
					padding: 0.25rem 0.5rem;
					border: 1px solid #666;
					border-radius: 4px;
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
			// cursor: pointer;
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