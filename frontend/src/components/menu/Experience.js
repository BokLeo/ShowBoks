// this page is About page

import React, { useState, useEffect, useRef } from 'react';
import ExperienceJob from './ExperienceJob';
import ExperienceLayout from '../layout/ExperienceLayout';

const experienceList = ['경력', '학력', '자격'];

const eduData = [
	{
		period: '2021.09 ~ 2022.03',
		title: '한국소프트웨어인재개발원(KOSMO)',
		desc: 'JAVA 개발자 양성과정(프로젝트 최우수상/특모범상/봉사상 수상)',
	},
	{
		period: '2019.12 ~ 2020.04',
		title: '이젠컴퓨터학원(안양)',
		desc: '스마트기기 UI/UX 웹디자인(웹퍼블리싱과정)',
	},
	{
		period: '2011.03 ~ 2017.03',
		title: '건양대학교(4년제)',
		desc: '시각디자인학과',
	},
	{
		period: '2008.03 ~ 2011.03',
		title: '인덕원고등학교',
		desc: '이과계열',
	},
];

const certData = [
	{
		period: '2020.04',
		title: '웹디자인기능사',
		desc: '한국산업인력공단',
	},
	{
		period: '2020.01',
		title: 'GTQ포토샵 1급',
		desc: '한국생산성본부(KPC)',
	},
	{
		period: '2020.01',
		title: 'GTQ일러스트 1급',
		desc: '한국생산성본부(KPC)',
	},
	{
		period: '2017.11',
		title: '자동차운전면허',
		desc: '경찰청(운전면허시험관리단)',
	},
	{
		period: '2011.05',
		title: 'MOS Office PowerPoint',
		desc: 'Microsoft',
	},
	{
		period: '2011.05',
		title: 'ACA Photoshop CS3',
		desc: 'ADOBE',
	},
];

/**
 * TODO : 한 페이지 내에서 버튼으로 window(화면)을 이동시키는 기능 구현에 어려움 발생.
 * - Date : 2024.08.29
 * - 브라우저의 Flags(실험실) 기능 중 'Smooth Scrolling'이 활성화 되어 있어야만 동작하는 것으로 보임.
 * - 해결하기 위해서 아래와 같은 시도해봄
 *    > scrollTo, scrollIntoView 등의 메서드 테스트 해봄 -> 실패
 *    > react-scroll 라이브러리 사용해봄 -> 실패
 *    > useRef를 사용해봄 -> 실패
 * - 과거 js로만으로도 충분히 구현 가능했던 기능이 react에서는 어려움을 겪고 있음. 분석 필요.
 *
 * **/

const Experience = () => {
	const [activeSection, setActiveSection] = useState('section1');
	const sectionRefs = useRef([]);

	const handleScroll = (index) => {
		const elTop = sectionRefs.current[index].offsetTop;
		window.scrollTo({ top: elTop - 100, behavior: 'smooth' });
	};

	useEffect(() => {
		const sections = sectionRefs.current;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.7 }
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => {
				if (section) observer.unobserve(section);
			});
		};
	}, []);

	return (
		<div className='experience'>
			<div className='sticky-title'>
				<h3>Experience</h3>
				<ul>
					{['Career', 'Education', 'Certification'].map((title, index) => (
						<li key={index}>
							<button
								onClick={() => handleScroll(index)}
								className={
									activeSection === `section${index + 1}` ? 'active' : ''
								}
								style={{
									background: 'none',
									border: 'none',
									padding: 0,
									cursor: 'pointer',
								}}
							>
								{title}
							</button>
						</li>
					))}
				</ul>
			</div>

			<div className='experience-detail'>
				{experienceList.map((title, index) => (
					<div
						key={index}
						id={`section${index + 1}`}
						className='experience-section'
						ref={(el) => (sectionRefs.current[index] = el)}
					>
						<h4>{title}</h4>
						{index === 0 ? (
							<ExperienceJob />
						) : (
							<ExperienceLayout
								section={index === 1 ? 'edu' : 'cert'}
								data={index === 1 ? eduData : certData}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Experience;
