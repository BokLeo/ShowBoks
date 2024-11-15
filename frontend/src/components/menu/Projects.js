// components/Home.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProjectCard from 'components/menu/project/ProjectCard';
import { projectList, applicationData, publishingData } from '../../data/projectData';


function Projects() {
	// 섹션에 대한 ref 배열 생성
	const sectionRefs = useRef(projectList.map(() => React.createRef()));
	const [activeSection, setActiveSection] = useState('section1');

	// 특정 섹션으로 스크롤하는 함수
	const handleScrollToSection = (index) => {
		setActiveSection(`section${index + 1}`);

    const headerHeight = 80; // 헤더 높이
    const sectionTop = sectionRefs.current[index].current.offsetTop;
    const scrollToPosition = sectionTop - headerHeight;

    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth',
    });
	};

	// 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let activeIndex = -1;

    sectionRefs.current.forEach((ref, index) => {
      if (ref.current) {
        const sectionTop = ref.current.offsetTop;
        const sectionBottom = sectionTop + ref.current.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          activeIndex = index;
        }
      }
    });

    if (activeIndex !== -1) {
      setActiveSection(`section${activeIndex + 1}`);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

	return (
		<div className='projects' style={{ display: 'flex', alignItems: 'baseline' }}>
      {/* 좌측 패널 */}
      <StickyTitle className='sticky-title'>
				<h3>Projects</h3>
        <ul>
					{projectList.map((section, index) => (
						<li key={index}>
							<button 
								onClick={() => handleScrollToSection(index)}
								className={activeSection === `section${index + 1}` ? 'active' : ''}
							>
								{section}
							</button>
						</li>
					))}
        </ul>
      </StickyTitle>

      {/* 우측 컨텐츠 영역 */}
      <div className='experience-detail' style={{ width: '80%' ,padding: '1rem' }}>
				{/* 경험이라면 ExperienceJob을 표시 아니라면 ExperienceLayout 표시 */}
				{projectList.map((section, index) => (
					<ExperienceSectionStyle 
						key={index} 
						ref={sectionRefs.current[index]} 
					>
						<SectionTitle>{section}</SectionTitle>

						{/* Dev Card */}
						{index === 0 && (
							applicationData.map((project, projectIndex) => (
								<ProjectCard key={projectIndex} card={project} />
							))
						)}

						{/* Publishing Card  */}
						{index === 1 && (
							publishingData.map((project, projectIndex) => (
								<ProjectCard key={projectIndex} card={project} />
							))
						)}
					</ExperienceSectionStyle>
				))}
      </div>
    </div>
	);
}

export default Projects;


const StickyTitle = styled.div`
	position: -webkit-sticky; /* For Safari */
	position: sticky;
	top: 110px;
	z-index: 1000; /* Optional: to ensure the title stays on top of other content */
	margin-right: 40px;
	width: 180px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	ul{
		color: #666;
		font-size: 1.5rem;
		margin-top: 12px;
		line-height: 2rem;
		text-align: right;

		li{
			button{
				&:hover{
					cursor: pointer;
					color: #007bff;
				}
				&.active{
					color: #007bff;
				}	
			}
		}
	}
`;

const SectionTitle = styled.h4`
	&::before{
		content: '🔹';
		display: inline-block;
		width: 4px;
		height: 16px;
		margin-right: 16px;
	}
	font-size: 1rem;
	padding: 8px 16px;
	border-bottom: 1px solid #d9d9d9;
	margin-bottom: 20px;
`;	

const ExperienceSectionStyle = styled.div`
	margin-bottom: 80px;
`;